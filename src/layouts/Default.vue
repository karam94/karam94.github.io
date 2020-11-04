<template>
  <div id="app">
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>

      <div class="header__right">
        <a href="/about/">About</a>
        <a href="/reading/">Reading</a>
        <a href="/speaking/">Speaking</a>
        <ToggleTheme />
      </div>
    </header>

    <transition name="fade" appear>
      <main class="main">
        <slot />
      </main>
    </transition>

    <footer class="footer">
      <span
        >Made with
        <span style="color: red"
          ><font-awesome :icon="['fas', 'heart']"
        /></span>
        in wet & rainy
        <a href="//en.wikipedia.org/wiki/Lancashire" target="_blank"
          >Lancashire</a
        >!</span
      ><br />
      <span
        >© Copyright {{ new Date().getFullYear() }} -
        <a href="//gridsome.org">Karam.io</a></span
      >
    </footer>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";

export default {
  components: {
    Logo,
    ToggleTheme,
  },
  props: {
    showLogo: { default: true },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  text-align: center;
  font-size: 0.8em;
  padding: calc(var(--space) / 2);
  border-top: 2px solid #eee;

  > span {
    margin: 0 0.35em;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}
</style>
