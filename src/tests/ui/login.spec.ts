import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page tests', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.openFromHome();
    await login.verifyUI();
  });

  test('Invalid credentials show error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('wrong@mail.com', 'wrongPassword');
    await login.verifyErrorMessage('The email address or password you entered is incorrect');
  });

  test('Password field is masked', async ({ page }) => {
    const login = new LoginPage(page);
    await login.expectPasswordMasked();
  });

  test('Empty credentials show hint', async ({ page }) => {
    const login = new LoginPage(page);
    await login.hoverFields();
  });

});
