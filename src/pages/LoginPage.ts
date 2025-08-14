import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loginTitle: Locator;
    readonly hintEmail: Locator;
    readonly hintPassword: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginTitle = page.locator('h1:has-text("Welcome back")');
        this.emailInput = page.locator('input[data-placeholder="Enter email"]');
        this.passwordInput = page.locator('input[data-placeholder="Enter password"][type="password"]');
        this.loginButton = page.locator('button:has-text("Log in")');
        this.errorMessage = page.locator('.nw-text-left.ngp-info-block-content');
        this.hintEmail = page.locator('.email-field .mat-error');
        this.hintPassword = page.locator('.auth-password-field .mat-error');
    }

    async openFromHome(): Promise<void> {
        await this.page.goto('https://paydo.com/');
        await this.page.locator('a.cards-main-baner__button:has-text("Open account")').click();
        await this.page.locator('span:has-text("Log In")').click();
        await expect(this.loginTitle).toBeVisible();
    }

    async verifyUI(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async hoverFields(): Promise<void> {
        await this.emailInput.clear();
        await this.passwordInput.clear();
        await expect(this.hintEmail).toHaveText('Please fill in this field to continue');
        await expect(this.hintPassword).toHaveText('Please fill in this field to continue');
    }

    async verifyErrorMessage(expectedText: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(expectedText);
    }

    async expectPasswordMasked(): Promise<void> {
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }
}
