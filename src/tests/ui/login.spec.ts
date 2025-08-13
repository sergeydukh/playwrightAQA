import { test } from '../fixtures/ui';

test.describe('Open the "Log In" page, enter invalid data and check the error message', () => {
    test('Open the "Log In" page', async ({ login }) => {
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
