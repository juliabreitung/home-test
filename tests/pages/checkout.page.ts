import { Page, Locator } from '@playwright/test';
import { parsePrice, sumPrices } from '../utils/helpers';
import type { CheckoutBillingData, CheckoutPaymentData } from '../data/test-data';

export class CheckoutPage {
  readonly page: Page;

  // Billing / user information
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;

  // Payment information
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expMonthSelect: Locator;
  readonly expYearInput: Locator;
  readonly cvvInput: Locator;

  // Cart summary (filas de ítems vs fila Total separadas)
  readonly cartItemRows: Locator;
  readonly itemPrices: Locator;
  readonly cartTotal: Locator;

  // Address confirmation & submit
  readonly sameAddressCheckbox: Locator;
  readonly continueToCheckoutButton: Locator;

  // Order confirmation (redirect after successful checkout)
  readonly orderNumberMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fullNameInput = page.locator('#fname');
    this.emailInput = page.locator('#email');
    this.addressInput = page.locator('#adr');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');

    this.cardNameInput = page.locator('#cname');
    this.cardNumberInput = page.locator('#ccnum');
    this.expMonthSelect = page.locator('#expmonth');
    this.expYearInput = page.locator('#expyear');
    this.cvvInput = page.locator('#cvv');

    // Ítems del carrito en <p>; la fila "Total" también tiene span.price y no debe sumarse
    this.cartItemRows = page.locator('p').filter({
      has: page.locator('span.price'),
      hasNotText: /^\s*Total/i,
    });
    this.itemPrices = this.cartItemRows.locator('span.price');
    this.cartTotal = page
      .locator('p')
      .filter({ hasText: /^\s*Total/i })
      .locator('span.price, strong')
      .first();

    this.sameAddressCheckbox = page.getByRole('checkbox', {
      name: /shipping address same as billing/i,
    });
    this.continueToCheckoutButton = page.getByRole('button', {
      name: 'Continue to checkout',
    });

    this.orderNumberMessage = page.locator('p[data-id="ordernumber"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  async fillBillingDetails(data: CheckoutBillingData): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.zip);
  }

  async fillPaymentDetails(data: CheckoutPaymentData): Promise<void> {
    await this.cardNameInput.fill(data.cardName);
    await this.cardNumberInput.fill(data.cardNumber);
    await this.expMonthSelect.selectOption({ label: data.expMonth });
    await this.expYearInput.fill(data.expYear);
    await this.cvvInput.fill(data.cvv);
  }

  async fillCompleteForm(
    billing: CheckoutBillingData,
    payment: CheckoutPaymentData,
  ): Promise<void> {
    await this.fillBillingDetails(billing);
    await this.fillPaymentDetails(payment);
  }

  /** Si "same address" NO está chequeado → chequearlo */
  async ensureSameAddressChecked(): Promise<void> {
    if (!(await this.sameAddressCheckbox.isChecked())) {
      await this.sameAddressCheckbox.check();
    }
  }

  /** Si "same address" está chequeado → deschequearlo */
  async ensureSameAddressUnchecked(): Promise<void> {
    if (await this.sameAddressCheckbox.isChecked()) {
      await this.sameAddressCheckbox.uncheck();
    }
  }

  async submitCheckout(): Promise<void> {
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL('**/order');
  }

  async submitCheckoutAndHandleAlert(): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.continueToCheckoutButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }

  async getItemPriceTexts(): Promise<string[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((text) => text.trim()).filter(Boolean);
  }

  async getCartTotalText(): Promise<string> {
    return (await this.cartTotal.textContent())?.trim() ?? '';
  }

  async getCartTotalValue(): Promise<number> {
    return parsePrice(await this.getCartTotalText());
  }

  async getExpectedCartTotalFromItems(): Promise<number> {
    return sumPrices(await this.getItemPriceTexts());
  }

  async getOrderNumber(): Promise<string> {
    const text = await this.orderNumberMessage.textContent();
    return text?.replace('Order Number:', '').trim() ?? '';
  }

}
