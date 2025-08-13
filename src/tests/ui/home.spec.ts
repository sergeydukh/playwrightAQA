import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Account Page Tests', () => {
  test('Open Account page and verify UI elements', async ({ page }) => {
    const home = new HomePage(page);
    const account = new AccountPage(page);

    await test.step('Открыть главную страницу', async () => {
      await home.goto();
    });

    await test.step('Перейти на страницу регистрации', async () => {
      await home.clickOpenAccount();
    });

    await test.step('Проверить UI-элементы на странице регистрации', async () => {
      await account.verifyUIElements();
    });

    await test.step('Проверить placeholder у Email', async () => {
      const emailPlaceholder = await account.emailInput.getAttribute('placeholder');
      await test.expect(emailPlaceholder).toBe('Enter email');
    });

    await test.step('Проверить placeholder у Password', async () => {
      const passwordPlaceholder = await account.passwordInput.getAttribute('placeholder');
      await test.expect(passwordPlaceholder).toBe('Enter password');
    });

    await test.step('Проверить placeholder у Confirm Password', async () => {
      const confirmPasswordPlaceholder = await account.confirmPasswordInput.getAttribute('placeholder');
      await test.expect(confirmPasswordPlaceholder).toBe('Enter password');
    });

    await test.step('Проверить правила ввода пароля', async () => {
      const passwordRulesText = await account.passwordRules.textContent();
      await test.expect(passwordRulesText).toMatch(/min.8 characters/i);
      await test.expect(passwordRulesText).toMatch(/lowercase letter /i);
      await test.expect(passwordRulesText).toMatch(/uppercase letter/i);
      await test.expect(passwordRulesText).toMatch(/at least 1 number/i);
    });
  });
});