<template>
  <div>
    <Author :show-title="true" />

    <div class="post-title">
      <h1 class="post-title__text">{{ title }}</h1>
    </div>

    <div class="post content-box__post">
      <div class="post__header"></div>

      <div class="post__content"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import Author from "./Author";

export default {
  components: {
    Author,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  padding-top: unset !important;
  text-align: center;
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
