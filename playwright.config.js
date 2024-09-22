// playwright.config.js
require('dotenv').config();

module.exports = {
  retries:3,
    use: {
      // Base URL for your tests
      baseURL: 'http://localhost:3000', 
  
      // Headless mode for browser testing
      headless: true, 
  
      // Default timeout for tests (in ms)
      timeout: 30000, 
  
      // Browser to use: chromium, firefox, or webkit
      browserName: 'chromium', 
  
      // Default viewport size
      viewport: { width: 1280, height: 720 },
  
      // Take a screenshot on failure
      screenshot: 'only-on-failure',
  
      // Record videos of test executions
      video: 'retain-on-failure',
    },
  };
  