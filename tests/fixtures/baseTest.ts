import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';
import { GridPage } from '../pages/grid.page';
import { SearchPage } from '../pages/search.page';
import { OrderPage } from '../pages/order.page';

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  gridPage: GridPage;
  searchPage: SearchPage;
  orderPage: OrderPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  gridPage: async ({ page }, use) => {
    await use(new GridPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
});

export { expect };
