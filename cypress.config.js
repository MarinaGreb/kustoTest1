const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://kusto-gord.vercel.app",
    specPattern: "**/*.cy.js",
    testIsolation: false,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 70000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  env: {
    MAILOSAUR_API_KEY: "UldWPLfXRyvoFvFMavEE9ApNLgwvubNI",
  },
  },
});

