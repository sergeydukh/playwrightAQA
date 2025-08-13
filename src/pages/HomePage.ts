import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly openAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountBtn = page.getByRole('link', { name: /Open account/i });
  }

  public async goto(): Promise<void> {
    await this.page.goto('/');
    await this.openAccountBtn.waitFor({ state: 'visible' });
}

  async clickOpenAccount() {
    await this.openAccountBtn.click();
  }
}
