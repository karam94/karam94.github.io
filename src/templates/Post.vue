<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>

      <PostMeta :post="$page.post" />
    </div>

    <div class="post content-box__post">
      <div class="post__header">
        <g-image
          v-if="$page.post.cover_image"
          alt="Cover image"
          :src="$page.post.cover_image"
        />
        <div class="post__header-credits">
          Image credits: <span v-html="$page.post.cover_image_credits" />
        </div>
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>
    </div>

    <div>
      <BuyMeACoffee />
    </div>

    <div class="post-comments">
      <div class="content-box__comments">
        <Disqus shortname="karamio" :identifier="$page.post.title" />
      </div>
    </div>
  </Layout>
</template>

<script>
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import BuyMeACoffee from "~/components/BuyMeACoffee";

export default {
  components: {
    PostMeta,
    PostTags,
    BuyMeACoffee,
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description,
        },
      ],
    };
  },
};
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D MMMM YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (width: 860, blur: 10)
    cover_image_credits
  }
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
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

  &__header-credits {
    text-align: center;
    font-size: 0.5rem;

    a {
      text-decoration: none;
      color: var(--base-color);
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
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
  max-width: var(--post-content-width);
  margin: 0 auto;
  padding: var(--space);
  border-radius: var(--radius);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
