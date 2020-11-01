<template>
  <div class="author">
    <g-image
      alt="Karam's image"
      class="author__image"
      src="~/assets/images/karam.webp"
      width="180"
      height="180"
      blur="50"
      immediate="true"
    />

    <vue-typed-js
      :strings="stringsToType"
      :type-speed="100"
      :back-delay="1000"
      :loop="true"
    >
      <h1 class="typing"></h1>
    </vue-typed-js>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["showTitle"],
  data() {
    return {
      stringsToType: [
        "Hi, I'm Karam!",
        "I <span style='color:red;'>♥</span> .NET Core, Vue.js &amp; lots more!",
        "Welcome to my blog!",
      ],
    };
  },
};
</script>

<style lang="scss">
.author {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  padding: calc(var(--space) / 2) 0;

  &__image {
    border-radius: 100%;
    width: 90px;
    height: 90px;
    margin-bottom: 1em;
  }

  &__intro {
    opacity: 0.8;
  }

  &__site-title {
    font-size: 1.5em;
  }

  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
    }
  }
}
</style>
