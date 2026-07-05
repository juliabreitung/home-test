import { test, expect } from '../../fixtures';
import { searchTestData } from '../../data/test-data';

test('Search Success — result message includes search term', async ({
  searchPage,
}) => {
  await searchPage.goto();
  await searchPage.searchFor(searchTestData.term);

  await expect(searchPage.resultMessage).toContainText(
    `${searchTestData.resultPrefix} ${searchTestData.term}`,
  );
});
