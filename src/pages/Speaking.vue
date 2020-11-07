<template>
  <Layout :show-logo="true">
    <PageTemplate title="Speaking">
      I’m a big believer in the importance of knowledge sharing and for that
      reason I’ve been getting involved more both internally at work and the
      external community by contributing with talks & workshops.<br /><br />

      The list below contains talks I’ve done and links to the slides or videos
      where applicable.<br /><br />

      <strong>Completed (2020)</strong>
      <ul>
        <li>
          Classicist vs. Mockist: Test-Driven Development - North West Tech
          Talks & at clients - Slides TBA
        </li>
        <li>An introduction to Vue.js - AND Digital (internal) - Slides TBA</li>
      </ul>

      <strong>Completed (2019)</strong>
      <ul>
        <li>Microservices 101 - AO.com (internal) - Slides TBA</li>
        <li>
          Domain Driven Design 101 & Event Storming - AO.com (internal) - Slides
          TBA
        </li>
        <li>Event Storming Workshop - AO.com (internal) - Slides TBA</li>
        <li>
          Monolith Decomposition & Microservice Communication - AO.com
          (internal) - Slides TBA
        </li>
        <li>
          Knowledge++: A lightning talk on the importance of thinking outside of
          the box, to share knowledge - North West Tech Talks -
          <a href="https://www.youtube.com/watch?v=5dl2ZbjtPCs">Video</a>
        </li>
        <li>
          GraphQL: Will it REALLY replace REST? - AO.com (internal) - Slides TBA
        </li>
        <li>
          OWASP, XSS, CSRF, JWT & more abbreviations! - AO.com (internal) -
          Slides TBA
        </li>
        <li>
          My accidental $750 AWS bill - North West Tech Talks -
          <a href="https://www.youtube.com/watch?v=Gnz-uUWmdao">Video</a>
        </li>
      </ul>
    </PageTemplate>
  </Layout>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate,
  },
  metaInfo: {
    title: "Speaking",
  },
};
</script>

<style></style>
