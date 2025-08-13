import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  testDir: 'src/tests',
  globalSetup: resolve(__dirname, 'src/hooks/global-setup.ts'),
  globalTeardown: resolve(__dirname, 'src/hooks/global-teardown.ts'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: process.env.CI ? 'list' : [['html'], ['list']],

  use: {
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'on',
    video: 'on',
  },

  ...(process.env.CI ? { workers: 1 } : {}),

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://paydo.com' },
      testMatch: /.*\/ui\/.*\.spec\.ts$/,
    },
    {
      name: 'api',
      testMatch: /.*\/api\/.*\.spec\.ts$/,
      use: {
        headless: true,
        baseURL: 'http://localhost:3000',
      },
      workers: 1,
      retries: 0,
    },
  ],
});
