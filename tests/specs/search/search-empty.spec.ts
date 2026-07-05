import { test, expect } from '../../fixtures';
import { searchTestData } from '../../data/test-data';

test('Search Empty — message shown when search word is missing', async ({
  searchPage,
}) => {
  await searchPage.goto();
  await searchPage.submitEmptySearch();

  await expect(searchPage.resultMessage).toContainText(
    searchTestData.emptyMessage,
  );
});
