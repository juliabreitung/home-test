import { test, expect } from '../../fixtures';

test('Login Failure B — blank fields show error message', async ({
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.submit();

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).not.toBeEmpty();
});
