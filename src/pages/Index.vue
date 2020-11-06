<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard
        v-for="edge in $page.posts.edges"
        :key="edge.node.id"
        :post="edge.node"
      />

      <Pager class="pager" :info="$page.posts.pageInfo" />
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  posts: allPost(perPage: 5, page: $page, filter: { published: { eq: true }}) @paginate {
    totalCount
    pageInfo { 
      totalPages 
      currentPage 
      isFirst 
      isLast 
    } 
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    Pager,
    Author,
    PostCard,
  },
  metaInfo: {
    title: "Karam's Blog",
  },
};
</script>

<style lang="scss">
.pager {
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;

  a {
    color: var(--body-color);
    text-align: center;
    text-decoration: none;
    padding: 0.5rem 0.5rem;
  }

  .active {
    text-decoration: underline;
  }
}
</style>
