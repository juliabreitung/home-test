import { Page, Locator } from '@playwright/test';
//https://redesigned-rotary-phone-vjgvgwwrpr72pg7j-3100.app.github.dev/home
export class HomePage {
  readonly page: Page;

  // Upper tabs
  readonly homeTab: Locator;
  readonly formTab: Locator;
  readonly gridTab: Locator;
  readonly searchTab: Locator;

  // Welcome section
  readonly welcomeTitle: Locator;
  readonly loggedUsername: Locator;

  constructor(page: Page) {
    this.page = page;

    // Tabs
    this.homeTab = page.locator('a[href="/home"]');
    this.formTab = page.locator('a[href="/checkout"]');
    this.gridTab = page.locator('a[href="/grid"]');
    this.searchTab = page.locator('a[href="/search"]');

    // Welcome message
    this.welcomeTitle = page.locator('#welcome-message h2');
    this.loggedUsername = page.locator('p[data-id="username"]');
  }

  async goto() {
    await this.page.goto('/home');
  }

  async goToForm() {
    await this.formTab.click();
  }

  async goToGrid() {
    await this.gridTab.click();
  }

  async goToSearch() {
    await this.searchTab.click();
  }

  async getLoggedUsername(): Promise<string> {
    return await this.loggedUsername.textContent() ?? '';
  }
}