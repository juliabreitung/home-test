import { Page, Locator } from '@playwright/test';

export class OrderPage {
  readonly page: Page;

  // Order confirmation elements
  readonly confirmationMessage: Locator;
  readonly orderNumberMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.confirmationMessage = page.locator('#order-confirmation h1');
    this.orderNumberMessage = page.locator('p[data-id="ordernumber"]');
  }

  async goto() {
    await this.page.goto('/order');
  }

  async getConfirmationText(): Promise<string> {
    return (await this.confirmationMessage.textContent()) ?? '';
  }

  async getOrderNumber(): Promise<string> {
    const text = await this.orderNumberMessage.textContent();
    return text?.replace('Order Number:', '').trim() ?? '';
  }

  async isOrderConfirmed(): Promise<boolean> {
    return await this.confirmationMessage.isVisible();
  }
}