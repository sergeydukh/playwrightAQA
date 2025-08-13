import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Account Page Tests', () => {
  test('Open Account page and verify UI elements', async ({ page }) => {
    const home = new HomePage(page);
    const account = new AccountPage(page);

    await test.step('Open https://paydo.com/ page', async () => {
      await home.goto();
    });

    await test.step('Go to registration page', async () => {
      await home.clickOpenAccount();
    });

    await test.step('Check UI-elements on registration page', async () => {
      await account.verifyUIElements();
    });

    await test.step('Check placeholder for Email', async () => {
      const emailPlaceholder = await account.emailInput.getAttribute('placeholder');
      await test.expect(emailPlaceholder).toBe('Enter email');
    });

    await test.step('Check placeholder for Password', async () => {
      const passwordPlaceholder = await account.passwordInput.getAttribute('placeholder');
      await test.expect(passwordPlaceholder).toBe('Enter password');
    });

    await test.step('Check placeholder for Confirm Password', async () => {
      const confirmPasswordPlaceholder = await account.confirmPasswordInput.getAttribute('placeholder');
      await test.expect(confirmPasswordPlaceholder).toBe('Enter password');
    });

    await test.step('Check password rules hint', async () => {
      const passwordRulesText = await account.passwordRules.textContent();
      await test.expect(passwordRulesText).toMatch(/min.8 characters/i);
      await test.expect(passwordRulesText).toMatch(/lowercase letter /i);
      await test.expect(passwordRulesText).toMatch(/uppercase letter/i);
      await test.expect(passwordRulesText).toMatch(/at least 1 number/i);
    });
  });
});