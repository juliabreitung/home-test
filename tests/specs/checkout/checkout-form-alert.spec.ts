import { test, expect } from '../../fixtures';
import { checkoutTestData } from '../../data/test-data';

test('Checkout Form Alert — alert is shown, confirmed, and gone', async ({
  checkoutPage,
  page,
}) => {
  await checkoutPage.goto();
  await checkoutPage.fillCompleteForm(
    checkoutTestData.billing,
    checkoutTestData.payment,
  );
  await checkoutPage.ensureSameAddressUnchecked();

  const alertMessage = await checkoutPage.submitCheckoutAndHandleAlert();
  expect(alertMessage.length).toBeGreaterThan(0);

  // Tras confirmar el alert, no debe redirigir a la página de orden
  await expect(page).toHaveURL(/\/checkout/);
});
