require('dotenv').config();

module.exports = {
  retries: 3,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    timeout: 30000,
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
