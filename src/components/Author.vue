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

    <div class="typing-container">
      <vue-typed-js
        :strings="stringsToType"
        :type-speed="100"
        :back-speed="50"
        :back-delay="1500"
        :loop="true"
      >
        <div class="typing"></div>
      </vue-typed-js>
    </div>

    <Social />
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
import Social from "./Social";

export default {
  components: {
    Social,
  },
  props: ["showTitle"],
  data() {
    return {
      stringsToType: [
        "Hi, I'm Karam!",
        "I <span style='color:red;'>♥</span> .NET, Vue.js, Next.js &amp; lots more!",
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
  margin-bottom: var(--space);
  border-bottom: 2px solid #e0e0e0;

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

.typing-container {
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  // margin-bottom: var(--space);
}
</style>
