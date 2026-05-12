import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:3006",
    viewport: { width: 390, height: 800 },
    locale: "en",
    browserName: "chromium",
  },
  projects: [
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 800 },
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3006,
    reuseExistingServer: true,
  },
});
