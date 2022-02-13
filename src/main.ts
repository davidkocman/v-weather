import { createApp } from "vue";
import { Quasar, Loading } from "quasar";

// Import icon libraries
import "@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css";
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Loading,
  }, // import Quasar plugins and add here
  config: {
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font-latin-ext", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        loading: {
          spinner: "QSpinner",
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Loading"],
    },
  },
});

myApp.mount("#app");
