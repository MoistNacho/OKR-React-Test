import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  env: {
    baseUrl: "http://localhost:6927",
    "cypress-react-selector": {
      root: "#root",
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:6927",
  },
});
