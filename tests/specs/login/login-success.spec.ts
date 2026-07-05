import { test, expect } from '../../fixtures';
import { loginTestData } from '../../data/test-data';

test('Login Success — welcome message shows username', async ({
  loginPage,
  homePage,
  page,
}) => {
  await loginPage.goto();
  await loginPage.login(
    loginTestData.valid.username,
    loginTestData.valid.password,
  );

  await expect(page).toHaveURL(/\/home/);
  await expect(homePage.loggedUsername).toContainText(
    loginTestData.valid.username,
  );
});
