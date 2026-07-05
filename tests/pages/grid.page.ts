import { Page, Locator } from '@playwright/test';

export class GridPage {
  readonly page: Page;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.item');
  }

  async goto(): Promise<void> {
    await this.page.goto('/grid');
  }

  /** Índice 0-based del DOM (para iterar todos los ítems) */
  private itemByIndex(index: number): Locator {
    return this.items.nth(index);
  }

  /** Posición 1-based según el README (posición 7 → índice 6) */
  private itemByPosition(position: number): Locator {
    return this.itemByIndex(position - 1);
  }

  private itemName(item: Locator): Locator {
    return item.locator('[data-test-id="item-name"]');
  }

  private itemPrice(item: Locator): Locator {
    return item.locator('#item-price');
  }

  private addToOrderButton(item: Locator): Locator {
    return item.locator('[data-test-id="add-to-order"]');
  }

  async getItemsCount(): Promise<number> {
    return this.items.count();
  }

  // -------- Por posición 1-based (escenario Grid Item Test) --------

  async getItemNameByPosition(position: number): Promise<string> {
    return (await this.itemName(this.itemByPosition(position)).textContent())?.trim() ?? '';
  }

  async getItemPriceByPosition(position: number): Promise<string> {
    return (await this.itemPrice(this.itemByPosition(position)).textContent())?.trim() ?? '';
  }

  getAddToOrderButtonByPosition(position: number): Locator {
    return this.addToOrderButton(this.itemByPosition(position));
  }

  // -------- Por índice 0-based (escenario Grid All Items Test) --------

  async getItemNameByIndex(index: number): Promise<string> {
    return (await this.itemName(this.itemByIndex(index)).textContent())?.trim() ?? '';
  }

  async getItemPriceByIndex(index: number): Promise<string> {
    return (await this.itemPrice(this.itemByIndex(index)).textContent())?.trim() ?? '';
  }

  getAddToOrderButtonByIndex(index: number): Locator {
    return this.addToOrderButton(this.itemByIndex(index));
  }

  async isItemImageVisibleByIndex(index: number): Promise<boolean> {
    return this.itemByIndex(index).locator('img').isVisible();
  }

  async isAddToOrderButtonVisibleByIndex(index: number): Promise<boolean> {
    return this.addToOrderButton(this.itemByIndex(index)).isVisible();
  }

  async addItemToOrderByIndex(index: number): Promise<void> {
    await this.addToOrderButton(this.itemByIndex(index)).click();
  }

}
