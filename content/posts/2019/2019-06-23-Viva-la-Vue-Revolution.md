---
title: Viva la Vue Revolución!
date: 2019-06-23
published: true
tags: ["Vue.js"]
series: false
cover_image: ./images/john-cameron-YDRvmSQypE0-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@john_cameron'>John Cameron</a>"
canonical_url: false
description: "The Vue community are rising up in revolt..."
---
## An uprising!
They will not force us.

They will stop degrading us.

They will not control us.

We will be victorious.

That's right, it's the chorus from [Uprising by Muse](https://www.youtube.com/watch?v=w8KQmps-Sog).

Why you might ask? Well, because some parts of the [VueJS](https://vuejs.org/) community are rising up in revolt.

#VivaLaVueRevolución!

![Viva La Vue Revolucion!](https://media.giphy.com/media/4no7ul3pa571e/giphy.gif)

## Why?
Roughly two weeks ago, Vue creator and project lead [Evan You](https://github.com/yyx990803) released an [RFC](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md) (request for comment paper) regarding a new function-based component API to replace (in the long term) the old, much loved, object API in the upcoming release of Vue 3.0.

The initial proposed adoption strategy within the RFC was to release two builds for Vue 3.0. One called the "Standard build" which contained backwards compatibility for the 2.x API and one called the "Lean build" which contained compatibility only for the 3.x API alongside a small subset of 2.x options.

It also at first stated:
> 2.x options compatibility will be kept through the entire 3.x lifecycle.

Then eventually changed to:
> 2.x options compatibility will be kept through the entire 3.x lifecycle. We may or may not remove some 2.x options in v4, but it depends on community feedback when that happens (which is going to be pretty far into the future). More importantly, even if we drop the options in the future, they can still be made available via userland plugins, since the two APIs work exactly the same internally.

And now, as of the time when I am writing this post, it has now changed to:
> **We have no fixed plan to remove of 2.x options. API removal will only happen if the APIs in question are no longer actively used by the community.**

## Okay, and?
The RFC spread like wildfire on [Reddit](https://www.reddit.com/r/vuejs/comments/c319el/vue_3_will_change_vue_in_a_big_way_current_syntax/) and [Hacker News](https://news.ycombinator.com/item?id=20237568) this week... and members of the community, exploded (disclaimer: not literally).

Ironically, that while it was evident that whilst a lot of the earlier readers of the RFC on GitHub were fans of the proposed changes (proposed being a key word here), a lot of the new surprised readers who were suddenly exposed to the RFC through Reddit and Hacker News, were certainly not.

## So, what's the change?
There are a lot of changes. A lot of which actually address problems with the current approach that people are reluctant to move away from. I suggest you [**read the RFC**]((https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md)). 

Regardless I'll also showcase an example of the main controversial change below, because visually comparing what the current Vue 2.x object API looks like directly with the proposed Vue 3.0 function-based component API should get the point across better than words.

### Vue 2.x Object API Example
{% highlight vue %}
<template>
  <div>
    <template v-if="isLoading">Loading...</template>
    <template v-else>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </template>
    <div>Mouse is at {{ x }}, {{ y }}</div>
  </div>
</template>

<script>
import { fetchPost } from './api'

export default {
  props: {
    id: Number
  },
  data() {
    return {
      isLoading: true,
      post: null,
      x: 0,
      y: 0
    }
  },
  mounted() {
    this.fetchPost()
    window.addEventListener('mousemove', this.updateMouse)
  },
  watch: {
    id: 'fetchPost'
  },
  destroyed() {
    window.removeEventListener('mousemove', this.updateMouse)
  },
  methods: {
    async fetchPost() {
      this.isLoading = true
      this.post = await fetchPost(this.id)
      this.isLoading = false
    },
    updateMouse(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  }
}
</script>
{% endhighlight %}
Source: [https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md)

### Vue 3.0 Proposed Function-based Component API Example
{% highlight vue %}
<template>
  <div>
    <template v-if="isLoading">Loading...</template>
    <template v-else>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </template>
  </div>
</template>

<script>
import { fetchPost, value, watch, onMounted, onUnmounted } from './api'

function useFetch(props) {
  const isLoading = value(true)
  const post = value(null)

  watch(() => props.id, async (id) => {
    isLoading.value = true
    post.value = await fetchPost(id)
    isLoading.value = false
  })

  return {
    isLoading,
    post
  }
}

function useMouse() {
  const x = value(0)
  const y = value(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}

export default {
  setup(props) {
    return {
      ...useFetch(props),
      ...useMouse()
    }
  }
}
</script>
{% endhighlight %}
Source: [https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md)

### Code speaks louder than words
I assume most people reading this will be familiar with Vue, but even if you are not, it is clear that based on only my example above, the RFC proposes significant changes between versions. At first glance, it's easy to see why it may have triggered a lot of people who have been writing code the 2.x way and are currently using it in production.

## People's General Problems and My Point of Vue (pun totally intended)
The high level FAQ within the RFC has done a fantastic job of dealing with the majority of the revolutionists problems. But I'd like to answer a few in the form of memes or gifs.

### "I use Vue because I dislike React. The proposed changes make Vue look and act too much like React."
React is a fantastic framework. In software development, there is no silver bullet. As developers it is natural that we develop tendencies towards languages, frameworks, coding styles and so forth that we prefer. We also sometimes have to use different tools, for different jobs. However, it is worth mentioning that just because something "looks" like React... Vue is still absolutely very different to React even with these changes. The old saying - don't judge a book by its cover, comes to mind.

In fact, if you've actually used React thoroughly... I don't know how even at first glance you can suggest that the snippet above suddenly "looks and acts too much like React" - particularly taking in to account the template code that I've missed out. But oh well, I guess people are entitled to their opinions, right?

Now I'm guessing that those who have this problem will probably be from two camps:

Camp A - Those who blindly just came to that conclusion by looking at the new proposed Vue 3.x approach based on what the code just quite simply looks like... and don't like change.

Camp B - Those who are aware of what React Hooks (and if you do, you should be buzzing that something similar is coming to Vue...) are and see that the proposed Vue 3.x approach takes heavy inspiration from it.

![Facepalm](https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif)

Firstly, I totally understand why the heavy syntax changes look daunting. However before one is quick to complain, the right approach should always be to take a step back and consider the trade-offs (The Chimp Paradox is a cool book that talks about how as humans, we wrongly tend to react irrationally and impulsively - check it out!).

Anyways, yes, no doubt that for small Vue components, the approach of separation of concerns being grouped based on types (e.g. props, data, watch, etc) works very well and looks very nice.

However - even as a predominantly backend developer - I have come across scenarios where my component clearly starts to grow legs and suddenly it leads to an improper separation of concerns. They call this the "monster component" problem within the RFC. [Mixins](https://javascript.info/mixins) is a word that springs to mind to try and solve this problem in the current world of Vue.

The new syntax meanwhile - despite looking daunting at first if you are not familiar with TypeScript - now allows us to encapsulate data and functionality in to multiple functions. In the Vue 3.x example given above, it is clear to see that the separation of concerns between 'things' to do with tracking the mouse movement coordinates and post fetching is far cleaner.

If you still don't like it and can justify reasons why, that aren't just based around personal syntactical preferences, then fine. You can still use the old 2.x way of doing things. However before exploding in anger and starting to yell things like "z0mg it l00ks exactly like react!11!!"... take a breather.

Secondly, what's wrong exactly with taking inspiration from [React Hooks](https://reactjs.org/docs/hooks-intro.html) if it resultantly results in a better Vue? In fact, according to the RFC, it results in somewhat of a superior product.

I came in to the world of Vue about two years ago, with both React & AngularJS hands on experience under my belt and one of the selling points to at least get me to give Vue a test drive was when someone described it to me as: "Imagine you took all the best bits from React & all the best bits from AngularJS and they had a baby... that baby would be Vue!".

I can only imagine this poor mindset against learning from other frameworks, stems from some internal mindset of "my framework's better than your framework therefore I don't want my framework to be anything like your framework". Huh?

<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">I think as developers we need to battle this &quot;don&#39;t adopt anything from your competitor&quot; mindset. A good idea doesn&#39;t become a bad idea just because it came from a project that you didn&#39;t like (before the idea was created).</p>&mdash; Evan You (@youyuxi) <a href="https://twitter.com/youyuxi/status/1142288779408842754?ref_src=twsrc%5Etfw">June 22, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### We are now forced to use TypeScript
Well, theoretically since you can still use the old Vue 2.x API, you don't have to and you can still stick to native. But you'll be missing out on lots of goodness.

TypeScript comes with many advantages and the old API, whilst having a CLI option for TypeScript, came with a lot of limitations which meant it wasn't sufficient to fully reap the benefits.

The Vue 3.0 API will allow full and proper usage of TypeScript.

The Vue 3.0 API being written in TypeScript will slightly steepen the learning curve, but because you're already familiar with the framework, you're already at the top of the hill and you've already done most of the heavy learning.

### Everything I learned in Vue 2.x has now gone down the drain!
No it hasn't. Your data is still there, your props still look the same, your watch method is still there... Vue hasn't actually gone anywhere. The majority of your learnings from Vue 2.x are still required to work in Vue 3.0.

![Nope, it hasn't.](https://media.giphy.com/media/ceeN6U57leAhi/giphy.gif)

I'll admit, I don't like the use of the value() method - which I'll address further down - but other than that, has it really changed? It really hasn't. This is quite clearly still Vue.

### Vue is loved because of the low learning curve, this new version looks more difficult to just about... do everything!
You know what? The new approach will probably require a slightly steeper learning curve. For example, if you're not familiar with TypeScript, that's automatically an added overhead...

However, looking back at when I was first learning React and then a couple of months later, started familiarising myself with (and fell in love with) Vue... a big helper for me was actually the Vue documentation.

I just found that thanks to the documentation being short, concise & clear, I was iterating really quickly in the small projects that I was making because it made learning and picking up the framework easier than alternatives I'd dealt with in the past.

It's all about trade-offs at the end of the day. So what if it takes slightly longer to feel comfortable with something if the end product will make you a more powerful developer? Rome wasn't built in a day.

I'm primarily a C# developer. In fact, I have been for the past 3 years of my life. I learn new things every day and new features are released every couple of months.

If it takes you an extra week to get comfortable with Vue 3.0 versus 2.x but it means you end up writing better and more powerful applications for the next 10 years of your life as a result... so be it!

![Flashbacks!](https://media.giphy.com/media/cEOG7nGA7448M/giphy.gif)

I have seen comments on reddit from people who call themselves "beginners" and how Vue's current separation of concerns and file structure is significantly simpler for them to comprehend than the new syntax or that of other frameworks. I can relate.

But, here I am as someone who uses Vue on a regular basis not just at home, but also in a production environment at work and I just cannot help but feel that with the insight and experience I have now with the framework, that the changes proposed for Vue 3.0 make perfect sense and will be totally worth in the long run the extra bit of effort it will take from me to get used to it.

It's a little bit like learning to drive. You can learn to drive well enough to pass your driving test. But you don't ***actually*** learn to drive until you've been on the road for a couple of years and get proper hands on experience.

Point is, the Vue team brought us the framework we all know and love. They work with it day in and day out. We haven't paid them a penny (in theory) and yet I feel like, I have so much to thank them for... just for making my development experience day in, day out, so fluffing awesome & enjoyable!

If you are on the fence, let's just trust that the experience and foresight they have that I'm talking about - that I certainly don't have and if you are a beginner, you too won't have - will pay dividends. No need to panic.

### Getting rid of data and having to use value() and .value everywhere is not clean.
Agreed, however decoupling from having to use this and end up with variables called self everywhere, makes it a worthy trade-off in my opinion as well as the other advantages it comes with.

Despite the pushing of the value wrapper in the RFC, it seems like using state() instead could lead to cleaner code.

For example, [/u/nigamshirish](https://www.reddit.com/user/nigamshirish/) from Reddit created a [TODO sample application](https://codepen.io/nigamshirish/full/vqxMvR) using a GitHub package that aims to mimic the function-based API pre-release that can be found [here](https://github.com/liximomo/vue-function-api) thanks to liximomo on GitHub.

Using the value wrapper, would lead to the code looking something like this:

{% highlight vuejs %}
new Vue({  
  setup() {
    let todo = value("")
    let items = value([])
    
    const add = () => {
      if(todo.value) {
        items.value.push(todo.value)
        todo.value = ""
      }
    }
    
    const remove = (item) => {
      items = items.value.filter(v => v !== item)
    }
    
    return {
      todo,
      items,
      add,
      remove
    }
  }
}).$mount('#app')
{% endhighlight %}

Whilst if we use state() instead, we can create something that certainly looks visually cleaner. I'm intrigued to see the Vue team's clarification on this and whether it is a plausible alternative or even better solution they haven't quite mentioned in the RFC yet.

{% highlight vue %}
new Vue({  
  setup() {  
    const data = state({
      todo: "",
      items: []
    })
    
    const add = () => {
      if(data.todo) {
        data.items.push(data.todo)
        data.todo=""
      }
    }
    
    const remove = (item) => {
      data.items = data.items.filter(v => v !== item)
    }
    
    return {
      data,
      add,
      remove
    }
  }
}).$mount('#app')
{% endhighlight %}

A codepen for you to play with can be found [here](https://codepen.io/nigamshirish/pen/vqxMvR).

### Is it not problematic when applying for jobs, that there will essentially be two different ways of writing Vue?
I highly doubt that companies looking for developers with Vue experience, will turn you down if they feel like you are the right candidate because you are only familiar with the older API.

I'm not sure this scenario is too different to applying for an Angular or React position with only Vue experience? Is learning on the job no longer a thing? Or is the market everywhere else a bit less open minded than the UK developer market?

What I've always found is useful with JavaScript front-end frameworks is that whilst they all differ in their own ways, as long as you understand a lot of the theoretical concepts that they share, the practical side will come with practice.

This reason against the 3.0 API that I've seen mentioned a couple of times, seems a little clutching at straws to me.

### It's ridiculous to threaten to deprecate the 2.x API come Vue 4.0!
Yes it is and I think that deep down, this is the biggest trigger behind the majority of the negative feedback. Its baffling-ness (please can we make that a word?) began the ball rolling.

I definitely felt both pain and confusion off the back of this one and I do feel like certain comments from members of the Vue team could have been worded better regarding this topic once the backlash began.

A lot of us have the old class API running in production and to expect us to all have to re-write our code (good luck trying to explain that one to your stakeholders), is not realistic.

Fortunately, the latest RCF change should hopefully mean that the deprecation past Vue 3.0 is no longer in their thoughts. It is incredibly important that whatever happens, the community are king.

> **We have no fixed plan to remove of 2.x options. API removal will only happen if the APIs in question are no longer actively used by the community.**

There have been a number of suggestions such as, release the proposed function-API as a new framework such as NueJS (I just came up with that name, how cool is that?) and keep Vue the way it is. Or to release the function API as an optional plugin/CLI option for Vue 3.0 such as TypeScript support has been in Vue 2.x.

I personally would like the latter and then come the Vue 4.0 release, I'd be intrigued to see collect some sort of measurable metric to justify making the function-class API the default out of the box approach. I'm not sure what exactly they would measure but that's not my problem for now. They're a lot smarter than I am so I'm sure they can come up with something.

Basically, if they think their new API is that great, prove the doubters wrong. Release the new API in to the wild and support it alongside the old API. You know how great the new one can potentially be, put your money where your mouth is and prove the community wrong. That way, when they announce that the old one is being fully deprecated, they can truly justify their decision simply by showcasing that the majority of users and the majority of the eco-system around the framework (such as Stack Overflow answers, for example) do prefer and are using in mass, the new API.

Waking up one day and deciding to deprecate the old one by a random unknown deadline because you feel like it, isn't the right solution and I think they've come to realise that by the RFC changes we have recently seen.

## What went wrong?
I think the Vue team have realised where they may have gone wrong.

Communication.

<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">(after 2 days of reading <a href="https://twitter.com/reddit?ref_src=twsrc%5Etfw">@reddit</a> and <a href="https://twitter.com/newsycombinator?ref_src=twsrc%5Etfw">@newsycombinator</a>)<br>There are comments stating that <a href="https://twitter.com/vuejs?ref_src=twsrc%5Etfw">@vuejs</a> core team communication level could be improved. I believe there are ways we can do better! Please help us and post any suggestions on how we can improve our communication 😊</p>&mdash; Natalia Tepluhina (@N_Tepluhina) <a href="https://twitter.com/N_Tepluhina/status/1142715703558103040?ref_src=twsrc%5Etfw">June 23, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Earlier today I was really itching to write a dedicated blog post for those who did not and still refuse to actually read the RFC, but it&#39;s my wife&#39;s birthday so I&#39;ll do it tomorrow. <a href="https://twitter.com/hashtag/Priorities?src=hash&amp;ref_src=twsrc%5Etfw">#Priorities</a></p>&mdash; Evan You (@youyuxi) <a href="https://twitter.com/youyuxi/status/1142741842674376707?ref_src=twsrc%5Etfw">June 23, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

RFC's are designed/written with very technical readers (and thus complex code snippets too) in mind. A bi-product of this is that they can as a result also be long in length.

When I first woke up and **skim**-read the RFC, I felt distraught. I was confused. I was worried that Vue was going to turn in to another Angular-type scenario.

However, I tried to keep a cool head and then sat down later with a warm cup of coffee and re-read the RFC back slowly, putting extra focus on specific areas to ensure I was fully and correctly comprehending the contents. Funnily enough, once I did that, my opinion actually flipped a whole 180 degrees and now I'm really excited for the changes.

So the fact of the matter is, nowadays a lot of people have short attention spans. Not everybody wants to read through a huge RFC and unfortunately instead they would just rather try and comprehend a complex topic as this one instead through their daily dosage of Reddit comments that they consider as a sufficient TL;DR.

A potential solution is to maintain an official Vue blog where posts are more concise and dare I say it, n00b friendly. The .NET guys do a fantastic job of this [here](https://devblogs.microsoft.com/dotnet/tag/c/). 

I also think the quality of communication is also important and I'd say [/u/piniondna's comment](https://www.reddit.com/r/vuejs/comments/c36gp9/the_2x_api_is_not_being_deprecated_in_3x_and_will/erp5ckx?utm_source=share&utm_medium=web2x) about replies to users on the RFC sums it up quite well. Along with [/u/Litaph's comment](https://www.reddit.com/r/vuejs/comments/c36gp9/the_2x_api_is_not_being_deprecated_in_3x_and_will/erpivim?utm_source=share&utm_medium=web2x).

Whilst both users are paraphrasing in places with their comments, having followed this kerfuffle from start to finish and read a lot of responses back and forth between the Vue team and members of the community in different places, it isn't hard to see how or why the message has come across like so to a large amount of the community.

Now, how can the quality of communication issue be solved? Probably through experience and learning from mistakes. The Vue team aren't the first people to probably experience this type of scenario nor will they be the last and I'm sure the past couple of days will certainly be a learning experience for them as well as the community. Sometimes, silence is golden and in future RFCs it might be worth holding back, analysing the communities issues/feedback and addressing recurring themes with a general consensus collectively rather than responding willy-nilly to individuals who could even be trolls wanting to add fuel to the fire in a casual comment style response. The issue with the "casual comment style response" on GitHub is that it leads to important members of the Vue team in this case, making individually casual statements which then go on to be interpreted as some sort of official statement on behalf of the framework and creates this sort of panic. It's just the unfortunate nature of open source software in this case partnered with a limited communicatory medium. Similar to how sometimes Twitter's character limit often results in messages correctly getting across.

## One last thing...
I've seen a couple of newcomers start new threads on [/r/vuejs](https://www.reddit.com/r/vuejs/) asking for advice and help only to get hit by upvoted comments that say something along the lines of "Don't bother continuing learning Vue, they've killed it. Go learn *insert another framework here* instead.".

![This is treason!](https://media.giphy.com/media/8FSLTCPdSjxVBuOSRm/giphy.gif)

![Stop it!](https://media.giphy.com/media/lRmjNrQZkKVuE/giphy.gif)

## An insight to the dank memes of /r/vuejs
![Dank memes](https://i.redd.it/wl0n3hfcf4631.jpg)
[Credit to /u/becauseSonance](https://www.reddit.com/r/vuejs/comments/c460wl/a_dank_recap_of_the_week/)

## Want to read the RFC yourself?
[Enjoy!](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md)

## PS:...
All this kerfuffle is over an RFC... so to add insult to injury, NONE of this could actually ever even be implemented! 😂

Bye! 👋