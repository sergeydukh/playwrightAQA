import { test } from '../fixtures/ui';

test.describe('Log In flow — single run', () => {
    test('Open, validate UI, invalid creds error, masked password, empty hints', async ({ login }) => {
        
        await test.step('Open the Log In page and verify UI', async () => {
            await login.openFromHome();
            await login.verifyUI();
        });

        await test.step('Invalid credentials show error', async () => {
            await login.login('wrong@mail.com', 'wrongPassword');
            await login.verifyErrorMessage('The email address or password you entered is incorrect');
        });

        await test.step('Password field is masked', async () => {
            await login.expectPasswordMasked();
        });

        await test.step('Empty credentials show field hints', async () => {
            await login.hoverFields();
        });
    });
});
