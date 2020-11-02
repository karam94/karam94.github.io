<template>
  <div class="social-icons">
    <a :href="`mailto:${$static.metadata.email}`" target="_blank">
      <font-awesome class="social-icons__icon" :icon="['fas', 'envelope']" />
    </a>

    <a :href="`http://github.com/${$static.metadata.github}`" target="_blank">
      <font-awesome class="social-icons__icon" :icon="['fab', 'github']" />
    </a>

    <a
      :href="`http://linkedin.com/in/${$static.metadata.linkedin}`"
      target="_blank"
    >
      <font-awesome class="social-icons__icon" :icon="['fab', 'linkedin']" />
    </a>
  </div>
</template>

<static-query>
query {
  metadata {
    email,
    github,
    linkedin
  }
}
</static-query>

<script>
export default {};
</script>

<style lang="scss">
.social-icons {
  &__icon {
    margin: 15px 5px;
  }

  a {
    color: var(--body-color);
  }
}
</style>
