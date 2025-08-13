import { Page, Locator, expect } from '@playwright/test';

export class AccountPage {
  readonly page: Page;

  // Navigation
  readonly backToHomePage: Locator;
  readonly loginButton: Locator;

  // Headings and Labels
  readonly createAccountTitle: Locator;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;
  readonly confirmPasswordLabel: Locator;

  // Input Fields
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  // Tooltips and Hints
  readonly tooltipContainer: Locator;
  readonly passwordRules: Locator;

  // Buttons
  readonly createAccountButton: Locator;
  readonly switchToCreateAccountButton: Locator;

  // Legal Information
  readonly termsOfUseText: Locator;
  readonly termsOfUseLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.backToHomePage = page.getByRole('link', { name: /back to homepage/i });
    this.loginButton = page.getByRole('link', { name: /Log In/i });

    // Headings and Labels
    this.createAccountTitle = page.getByRole('heading', { level: 1, name: /create a personal account/i });
    this.emailLabel = page.locator('text=Email'); // Упростил, чтобы не зависеть от Angular классов
    this.passwordLabel = page.locator('text=/^Password$/');
    this.confirmPasswordLabel = page.locator('text=Confirm password');

    // Input Fields
    this.emailInput = page.getByPlaceholder('Enter email');
    this.passwordInput = page.getByPlaceholder('Enter password').first();
    this.confirmPasswordInput = page.getByPlaceholder('Enter password').last();

    // Tooltips and Hints
    this.tooltipContainer = page.locator('ngp-tooltip.ngp-tooltip--primary');
    this.passwordRules = page.locator('.ngp-field-requirements');

    // Buttons
    this.createAccountButton = page.getByRole('button', { name: /Create an account/i });
    this.switchToCreateAccountButton = page.getByRole('link', { name: /switch to create business account/i });

    //  Legal Information
    this.termsOfUseText = page.locator('text=By creating an account you confirm that you read and accept our');
    this.termsOfUseLink = page.getByRole('link', { name: /Terms of Use/i });
  }

  
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password: string) {
    await this.confirmPasswordInput.fill(password);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

 
  async verifyUIElements() {
    await expect(this.backToHomePage).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.createAccountTitle).toBeVisible();
    await expect(this.emailLabel).toBeVisible();
    await expect(this.passwordLabel).toBeVisible();
    await expect(this.confirmPasswordLabel).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
    await expect(this.switchToCreateAccountButton).toBeVisible();
    await expect(this.passwordRules).toBeVisible();
    await expect(this.tooltipContainer).toBeVisible();
    await expect(this.termsOfUseText).toBeVisible();
    await expect(this.termsOfUseLink).toBeVisible();
  }

  async getPasswordRules(): Promise<string | null> {
    return this.passwordRules.textContent();
  }
}
