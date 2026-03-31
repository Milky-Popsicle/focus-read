const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'frontend/support/e2e.js',
    specPattern: 'frontend/tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});