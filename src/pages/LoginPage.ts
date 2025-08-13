// pages/LoginPage.ts
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
    this.loginTitle = page.getByRole('heading', { level: 1, name: /Welcome back/i });
    this.emailInput = page.getByPlaceholder('Enter email');
    this.passwordInput = page.getByPlaceholder('Enter password').and(page.locator('input[type="password"]'));
    this.loginButton = page.getByRole('button', { name: /Log in/i });
    this.errorMessage = page.locator('.nw-text-left.ngp-info-block-content');
    this.hintEmail = page.locator('.email-field .mat-error');
    this.hintPassword = page.locator('.auth-password-field .mat-error');
  }

  
  async openFromHome() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: /Open account/i }).click();
    await this.page.getByRole('link', { name: /Log In/i }).click();
    await expect(this.loginTitle).toBeVisible();
  }


  async verifyUI() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async hoverFields() {
    await this.emailInput.click();
    await this.passwordInput.click();
    await this.page.locator('body').click();
    await expect(this.hintEmail).toHaveText("Please fill in this field to continue");
    await expect(this.hintPassword).toHaveText("Please fill in this field to continue");
  }

  
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toHaveText(expectedText);
  }


  async expectPasswordMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
}
