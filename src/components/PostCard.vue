<template>
  <div
    class="post-card content-box"
    :class="{ 'post-card--has-poster': post.poster }"
  >
    <div class="post-card__header">
      <g-image
        v-if="post.cover_image"
        alt="Cover image"
        class="post-card__image"
        :src="post.cover_image"
      />
    </div>
    <div class="post-card__content">
      <h3 class="post-card__title" v-html="post.title" />
      <PostTags class="post-card__tags" :post="post" />
      <g-link class="post-card__link" :to="post.path">Link</g-link>
    </div>
  </div>
</template>

<script>
import PostTags from "~/components/PostTags";

export default {
  components: {
    PostTags,
  },
  props: ["post"],
};
</script>

<style lang="scss">
.post-card {
  margin-bottom: var(--space);
  position: relative;

  &__header {
    margin-left: calc(var(--space) * -1);
    margin-right: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) * 0.8);
    margin-top: calc(var(--space) * -1);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    &:empty {
      display: none;
    }
  }

  &:hover .post-card__image {
    filter: none;
    -webkit-filter: grayscale(0%);
    transition: all 0.8s ease;
  }

  &__image {
    min-width: 100%;
    filter: gray;
    -webkit-filter: grayscale(100%);
  }

  &__title {
    margin-top: 0;
  }

  &__tags {
    z-index: 1;
    position: relative;
  }

  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}
</style>
