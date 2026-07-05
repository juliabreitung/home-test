import { test, expect } from '../../fixtures';
import { checkoutTestData } from '../../data/test-data';

test('Checkout Order Success — order confirmation number is not empty', async ({
  checkoutPage,
}) => {
  await checkoutPage.goto();
  await checkoutPage.fillCompleteForm(
    checkoutTestData.billing,
    checkoutTestData.payment,
  );
  await checkoutPage.ensureSameAddressChecked();
  await checkoutPage.submitCheckout();

  await expect(checkoutPage.orderNumberMessage).toBeVisible();
  expect(await checkoutPage.getOrderNumber()).not.toBe('');
});
