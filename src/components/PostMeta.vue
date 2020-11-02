<template>
  <div class="post-meta">{{ post.date }} - {{ post.timeToRead }} mins</div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss">
.post-meta {
  font-size: 0.8em;
  opacity: 0.8;
}
</style>
