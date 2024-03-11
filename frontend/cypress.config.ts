import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false, // Disable the default support file for end-to-end tests
    specPattern: 'src/cypress/test.cy.tsx', // Example spec pattern for end-to-end tests
  },
  component: {
    supportFile: false, // Disable the default support file for component tests
    specPattern: 'src/cypress/test.cy.tsx', // Example spec pattern for component tests
  },
});
