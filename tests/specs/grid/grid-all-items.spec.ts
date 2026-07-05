import { test, expect } from '../../fixtures';

test('Grid All Items — each item has title, price, image and button', async ({
  gridPage,
}) => {
  await gridPage.goto();

  const itemCount = await gridPage.getItemsCount();
  expect(itemCount).toBeGreaterThan(0);

  for (let index = 0; index < itemCount; index++) {
    expect(await gridPage.getItemNameByIndex(index)).not.toBe('');
    expect(await gridPage.getItemPriceByIndex(index)).not.toBe('');
    expect(await gridPage.isItemImageVisibleByIndex(index)).toBe(true);
    expect(await gridPage.isAddToOrderButtonVisibleByIndex(index)).toBe(true);
  }
});
