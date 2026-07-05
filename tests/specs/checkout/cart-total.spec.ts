import { test, expect } from '../../fixtures';

test('Cart Total — cart total matches sum of item prices', async ({
  checkoutPage,
}) => {
  await checkoutPage.goto();

  const expectedTotal = await checkoutPage.getExpectedCartTotalFromItems();
  const actualTotal = await checkoutPage.getCartTotalValue();

  expect(actualTotal).toBe(expectedTotal);
});
