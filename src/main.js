import { VueTypedJs } from "vue-typed-js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Import main css
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

config.autoAddCss = false;
library.add(faHeart, faEnvelope, faGithub, faLinkedin);

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  Vue.component("VueTypedJs", VueTypedJs);
  Vue.component("FontAwesome", FontAwesomeIcon);

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
