<template>
  <Layout :show-logo="true">
    <PageTemplate title="Reading">
      I’ve recently started dedicating more time towards reading books of a more
      technical nature. Here is a list of the books I’ve read so far with links
      to their summaries where applicable which I will be posting as blog posts
      upon completion. The list below mainly allows me to keep track of what I
      have, haven’t read and plan to read. <br /><br />

      <strong>Currently Reading Clean Code:</strong>
      <ul>
        <li>A Handbook of Agile Software Craftsmanship by Robert C. Martin</li>
      </ul>

      <strong>Reading Backlog</strong>
      <ul>
        <li>C# in Depth 4th Edition by Jon Skeet</li>
        <li>
          The Clean Coder: A Code of Conduct for Professional Programmers by
          Robert C. Martin
        </li>
        <li>
          The Mythical Man-Month: Essays on Software Engineering by Frederick P.
          Brooks. Jr
        </li>
        <li>
          Rolling Rocks Downhill: How to Ship YOUR Software Projects On Time,
          Every Time by Clarke Ching
        </li>
        <li>Domain-Driven Design Distilled by Vaughn Vernon</li>
        <li>
          Building Microservices: Designing Fine-Grained Systems by Sam Newman
        </li>
      </ul>

      <strong>Completed</strong>
      <ul>
        <li>
          The Lean Startup: How Constant Innovation Creates Radically Successful
          Businesses by Eric Ries
        </li>
        <li>
          Accelerate: The Science of Lean Software and DevOps: Building and
          Scaling High Performing Technology Organizations by Nicole Forsgren
          PhD., Jez Humble and Gene Kim
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
    title: "Reading",
  },
};
</script>

<style></style>
