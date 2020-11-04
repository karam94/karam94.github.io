<template>
  <div>
    <div class="post-title">
      <h1 class="post-title__text">{{ title }}</h1>
    </div>

    <div class="post content-box__post">
      <div class="post__header"></div>

      <div class="post__content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
