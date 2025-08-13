import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

type UiFixtures = {
    home: HomePage;
    login: LoginPage;
    uiSetup: void;
};

export const test = base.extend<UiFixtures>({
    // Auto hook: navigate to Home before each UI test
    uiSetup: [
        async ({ page }, use) => {
            await page.goto('/');
            await use();
        },
        { auto: true }
    ],

    home: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    login: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export const expect = test.expect;
