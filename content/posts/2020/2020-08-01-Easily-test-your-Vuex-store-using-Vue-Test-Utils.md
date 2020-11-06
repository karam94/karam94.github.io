---
title: Easily test your Vuex store using Vue Test Utils.
date: 2020-08-01
published: true
tags: ["Vue.js", "Testing"]
series: false
cover_image: ./images/national-cancer-institute-DYQfoftWGXw-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@nci'>National Cancer Institute</a>"
canonical_url: false
description: "Tired of brittle tests by testing your Vuex actions, mutations and getters all separately? Vue Test Utils has the solution!"
---
If you like [Vue.js](https://vuejs.org/), then you probably already know what [Vuex](https://vuex.vuejs.org/]) is. It's a state management pattern & library for Vue.js applications that is inspired by a Flux/Redux-like architecture.

The library is developed and maintained by the Vue.js development team, which means it is the official recommended state management library for the framework. No more state management framework arguments!

<figure>
    <img src="https://images.unsplash.com/photo-1576089388754-68c54a863b60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    style="width: 100%; display: block; margin-left: auto; margin-right: auto;"/>
</figure>

This post is going to encapsulate a technique I've come across that allows you to easily write tests around your Vuex store that results in far less brittle tests, than unit testing the individual moving parts individually.

Vuex is made up of numerous core concepts. Actions, mutations and getters are the main moving parts. Because they are all written as plain JavaScript functions, they can all therefore be unit tested in isolation quite easily.

The issue with this approach though is that it leads to brittle tests and sometimes, false-positives. For example, to unit test an action, we might test that it ends up commiting a specific mutation, with certain expected parameters. We could quite easily use [Jest](https://jestjs.io/) to do this.

The problem however is, what would happen if we changed the name of one of our Vuex action functions? Firstly, our test would fail to run because it no longer imports/references a function that exists. Since our test would import the actions function directly, we would simply rename the function call to pass the test.

However, within our actual Vue component code, we will be doing `this.$store.dispatch('oldActionName')` in order to dispatch our action, not directly importing the action function. Therefore, if we don't have adequate end to end testing within our application, we could quite easily find ourselves in the scenario where we have passing unit tests but an application that doesn't work because we're still dispatching the old action!

Fortunately though, the amazing Vue development team who are also behind Vue's official unit testing library (which uses Jest too by the way) - [Vue Test Utils](https://vue-test-utils.vuejs.org/) - have given us an easy solution for this problem. The solution, believe it or not, is to just facilitate the testing of our Vuex store as a whole, rather than the individual cogs.

Below is a walkthrough with example pseudo-ish code modelled on how I've managed to test my store without running in to any of these problems.

In this case, we are going to test our store end to end, actions, mutations, getters, you name it, all within a single test. I've seen some argue that this is an integration test, however since all external collaborators should still be mocked, I'd argue it's just a slightly larger unit test.

The scenario is an Instagram-like post feed. I have a `loadPosts` action within the posts slice of my Vuex store, which uses [axios](https://github.com/axios/axios) to make an asynchronous remote call to an API to retrieve these posts and then place them within the application's global Vuex state.

We begin by defining our Vuex store:

```javascript
import Vue from "vue";
import Vuex from "vuex";
import posts from "./modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts
  },
});
```

Next we define what our posts Vuex state slice/module looks like:

```javascript
import Vue from "vue";
import axios from "axios";

const state = () => ({
  posts: [],
});

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
};

const actions = {
  loadPosts({ commit }) {
    axios
      .get("/api/posts/")
      .then(function(response) {
        commit("SET_POSTS", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};

const getters = {
    getPosts: (state) => {
        return state.posts;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
```

Here we're storing a list of posts as part of our state. We have our `loadPosts` action that triggers the axios call. We have our `SET_POSTS` mutation that changes our value of `posts` within our global state and finally we have a getter called `getPosts` that we can use to retrieve the value of `posts` from our state.

Now in order to test our state, it's simple. We want to dispatch the `loadPosts` action to our store and then assert that the expected value, is obviously stored within our store. Simple, right? In order to do this, we have to touch all the moving parts of our Vuex store within the test.

```javascript
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import createStoreConfig from "./__mocks__/storeConfig";
import mockPosts from "./__mocks__/posts.json";

let store;

beforeEach(() => {
  createLocalVue().use(Vuex);
  const storeConfig = createStoreConfig();
  store = new Vuex.Store(storeConfig);
});
```

```javascript
import posts from "../../modules/posts";

export default function createStoreConfig() {
    return {
      modules: {
        posts,
      },
    };
  }
```

Here we use the `createLocalVue` class provided to us by Vue Test Utils to create a Vue class for us to add our components, plugins (Vuex in this case) to, to use as part of our test without polluting the global Vue class. We put this within our `beforeEach` which ensures that every store test, not only uses a separate Vue instance but also starts off fresh with a blank store.

```javascript
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import createStoreConfig from "./__mocks__/storeConfig";
import mockPosts from "./__mocks__/posts.json";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: mockPosts })),
}));

let store;

beforeEach(() => {
  createLocalVue().use(Vuex);
  const storeConfig = createStoreConfig();
  store = new Vuex.Store(storeConfig);
});

describe("Post Store Tests", () => {
  it("loads posts and updates them in state", async () => {
    await store.dispatch("posts/loadPosts");
    expect(store.getters["posts/getPosts"]).toEqual(mockPosts);
  });
});
```

In order to write our test, we need to mock our axios API call. We can use Jest to do this. In this case, I've opted to store a similar JSON representation of the data that would come back from the real API in a JSON file, however in theory you can use whatever you want, as long as it ends up being stored in state. The reason why we want to mock our axios calls is to prevent our unit tests taking a long time to run and to ensure we have no external dependencies which could cause obvious problems (e.g. if the API ever went down, our tests would fail even though our code in theory works fine).

The test itself is simple. We use the store object we create before the running of each test to dispatch the action we want to test. If this action works correctly, then it should trigger the mutation too, under the hood. We then use our getter on the store to assert that the data within the state has mutated as expected. Done and dusted!

One of the great things about testing our Vuex store this way is that within our test, we are calling `store.dispatch("posts/loadPosts")` the exact same way our real smart components are. We're no longer importing the `loadPosts` function directly and testing it under different circumstances to how our actual application is using it. So, if our test breaks, then our application is most certainly also broken!

If any part of the Vuex journey to mutate an element of state breaks, the test will know about it. The main downside to this approach versus the more granular approach, is that it will be harder to debug exactly what moving part went wrong.

Hope this helps...
and as always, thanks for reading!