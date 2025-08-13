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
    this.loginButton = page.locator('span:has-text("Log In")');

    // Headings and Labels
    this.createAccountTitle = page.getByRole('heading', { level: 1, name: /create a personal account/i });
    this.emailLabel = page.locator('text=Email'); // Упростил, чтобы не зависеть от Angular классов
    this.passwordLabel = page.locator('text=/^Password$/');
    this.confirmPasswordLabel = page.locator('text=Confirm password');

    // Input Fields
    this.emailInput = page.locator('input[placeholder="Enter email"]');
    this.passwordInput = page.locator('input[placeholder="Enter password"]').first();
    this.confirmPasswordInput = page.locator('input[placeholder="Enter password"]').last();

    // Tooltips and Hints
    this.tooltipContainer = page.locator('.cdk-overlay-container');
    this.passwordRules = page.locator('.ngp-field-requirements');

    // Buttons
    this.createAccountButton = page.locator('button:has-text("Create an account")');
    this.switchToCreateAccountButton = page.getByRole('link', { name: /switch to create business account/i });

    //  Legal Information
    this.termsOfUseText = page.locator('text=By creating an account you confirm that you read and accept our');
    this.termsOfUseLink = page.locator('a:has-text("Terms of Use")');
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
    await expect(this.termsOfUseText).toBeVisible();
    await expect(this.termsOfUseLink).toBeVisible();
  }

  async getTooltipText(triggerLocator: Locator): Promise<string | null> {
    const host = this.page.locator('ngp-text-field.email-field mat-label ngp-tooltip');
    const overlay = this.page.locator('.cdk-overlay-container');

  await this.hoverBrutal(host, this.page);
  await overlay.waitFor({ state: 'visible' });
  return (await overlay.textContent())?.trim() ?? '';
  }

  async getPasswordRules(): Promise<string | null> {
    return this.passwordRules.textContent();
  }

  async hoverBrutal(loc: import('@playwright/test').Locator, page: import('@playwright/test').Page) {
    await loc.scrollIntoViewIfNeeded();
  
   
    try { await loc.hover({ position: { x: 6, y: 6 } }); await page.waitForTimeout(120); } catch {}
  
   
    const box = await loc.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 2, box.y + 2);
      await page.mouse.move(box.x + Math.min(10, box.width - 2), box.y + Math.min(10, box.height - 2));
      await page.waitForTimeout(120);
    }
  
  
    try {
      await loc.dispatchEvent('pointerover');
      await loc.dispatchEvent('pointerenter');
      await loc.dispatchEvent('mouseover');
      await loc.dispatchEvent('mouseenter');
      await page.waitForTimeout(120);
    } catch {}
  }

}
