import { test, expect } from '../../fixtures';
import { loginTestData } from '../../data/test-data';

test('Login Failure A — wrong credentials show error message', async ({
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    loginTestData.invalid.username,
    loginTestData.invalid.password,
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).not.toBeEmpty();
});
