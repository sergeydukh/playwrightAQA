import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly openAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountBtn = page.locator('a.cards-main-baner__button:has-text("Open account")');
  }

  public async goto(): Promise<void> {
    await this.page.goto('https://paydo.com/');
    await this.openAccountBtn.waitFor({ state: 'visible' });
}

  async clickOpenAccount() {
    await this.openAccountBtn.click();
  }
}
