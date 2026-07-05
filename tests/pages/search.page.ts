import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  // Search elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.searchInput = page.locator('input[name="searchWord"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.resultMessage = page.locator('#result');
  }

  async goto() {
    await this.page.goto('/search');
  }

  async searchFor(text: string) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  async submitEmptySearch() {
    await this.searchInput.clear();
    await this.searchButton.click();
  }

  async getResultMessage(): Promise<string> {
    return (await this.resultMessage.textContent()) ?? '';
  }

  async isResultMessageVisible(): Promise<boolean> {
    return await this.resultMessage.isVisible();
  }
}