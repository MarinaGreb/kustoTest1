const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://kusto-gamma.vercel.app",
    specPattern: "**/*.cy.js",
    testIsolation: false,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 70000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  env: {
    MAILOSAUR_API_KEY: "6W0M88br4tCzMEIWu7w0EiQmo2SWe5eo",
  },
  },
});

