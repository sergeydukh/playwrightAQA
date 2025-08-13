import { test } from '../fixtures/ui';

test.describe('Account Page Tests', () => {
    test('Open Account page and verify UI elements', async ({ home }) => {
        await test.step('Open https://paydo.com/ page', async () => {
            await home.goto();
        });

        await test.step('Go to "Open Account" page', async () => {
            await home.clickOpenAccount();
        });

        await test.step('Check UI-elements on registration page', async () => {
            await home.verifyUIElements();
        });

        await test.step('Check placeholder for Email', async () => {
            const emailPlaceholder = await home.emailInput.getAttribute('placeholder');
            await test.expect(emailPlaceholder).toBe('Enter email');
        });

        await test.step('Check placeholder for Password', async () => {
            const passwordPlaceholder = await home.passwordInput.getAttribute('placeholder');
            await test.expect(passwordPlaceholder).toBe('Enter password');
        });

        await test.step('Check placeholder for Confirm Password', async () => {
            const confirmPasswordPlaceholder = await home.confirmPasswordInput.getAttribute('placeholder');
            await test.expect(confirmPasswordPlaceholder).toBe('Enter password');
        });

        await test.step('Check password rules hint', async () => {
            const passwordRulesText = await home.passwordRules.textContent();
            await test.expect(passwordRulesText).toMatch(/min.8 characters/i);
            await test.expect(passwordRulesText).toMatch(/lowercase letter /i);
            await test.expect(passwordRulesText).toMatch(/uppercase letter/i);
            await test.expect(passwordRulesText).toMatch(/at least 1 number/i);
        });
    });
});
