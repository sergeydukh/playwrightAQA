import { test } from '../fixtures/ui';

test.describe('Login Page tests', () => {
  test.beforeEach(async ({ login }) => {
    await login.openFromHome();
    await login.verifyUI();
  });

  test('Invalid credentials show error', async ({ login }) => {
    await login.login('wrong@mail.com', 'wrongPassword');
    await login.verifyErrorMessage('The email address or password you entered is incorrect');
  });

  test('Password field is masked', async ({ login }) => {
    await login.expectPasswordMasked();
  });

  test('Empty credentials show hint', async ({ login }) => {
    await login.hoverFields();
  });

});
