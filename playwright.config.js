// @ts-check
import { defineConfig, devices } from '@playwright/test';
import {loadEnv} from "vite";
import path from "path";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const envMode = 'test';
const loadedEnvVars = loadEnv(envMode, process.cwd(), '');

Object.assign(process.env, loadedEnvVars);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js', // Deep-scan all nested subfolders for spec files
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // Vite loads .env.test pointing to backend Docker container (port 8001)
    command: 'npm run dev -- --mode test',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // Safe buffer window for Vite compilations metrics
  },
});

