import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from "vite";

const envMode = 'test';
const loadedEnvVars = loadEnv(envMode, process.cwd(), '');

Object.assign(process.env, loadedEnvVars);

//  Enforce absolute fail-closed check for the configuration file execution
if (!process.env.BYPASS_SECRET) {
  throw new Error(" CRITICAL: BYPASS_SECRET environment variable is not defined in the loaded test environment.");
}

const authFile = 'playwright/.auth/user.json';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  //  Broaden scope to match both *.test.js and *.spec.js filenames cleanly
  testMatch: ['**/*.test.js', '**/*.spec.js'],

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

    // Apply the bypass headers globally to all contexts, pages, and projects
    //  Removed the hardcoded fallback value string pattern entirely
    extraHTTPHeaders: {
      'x-test-bypass': process.env.BYPASS_SECRET
    }
  },

  /* Configure projects for major browsers */
  projects: [
    // 1. Define the isolated Authentication Setup Project
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/, // Specifically targets your setup file
      use: {
        browserName: "firefox"
      }
    },
    // 2. Update your main browser configuration to use the session state
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Automatically injects the generated cookies and localStorage tokens
        storageState: authFile
      },
      // Blocks execution until your 'setup' project completes successfully
      dependencies: ['setup'],
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