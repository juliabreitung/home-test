import { test, expect } from '../../fixtures';
import { gridTestData } from '../../data/test-data';

test('Grid Item Test — position 7 shows Super Pepperoni at $10', async ({
  gridPage,
}) => {
  await gridPage.goto();

  expect(await gridPage.getItemNameByPosition(7)).toBe(
    gridTestData.position7.title,
  );
  expect(await gridPage.getItemPriceByPosition(7)).toBe(
    gridTestData.position7.price,
  );
});
