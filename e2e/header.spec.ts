import { test, expect } from '@playwright/test';

test.describe('Header Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have the same size for theme and language switcher buttons', async ({ page }) => {
    const themeButton = page.locator('button[title*="theme"]');
    const langButtonZh = page.getByLabel('切换到中文');
    const langButtonEn = page.getByLabel('Switch to English');
    const langButtonJa = page.getByLabel('日本語に切り替える');

    const themeBox = await themeButton.boundingBox();
    const zhBox = await langButtonZh.boundingBox();
    const enBox = await langButtonEn.boundingBox();
    const jaBox = await langButtonJa.boundingBox();

    if (themeBox?.width !== zhBox?.width) {
      console.log('Theme button styles:', await themeButton.evaluate(el => JSON.stringify(getComputedStyle(el))));
      console.log('Zh button styles:', await langButtonZh.evaluate(el => JSON.stringify(getComputedStyle(el))));
    }

    expect(themeBox?.width).toBe(zhBox?.width);
    expect(themeBox?.height).toBe(zhBox?.height);

    expect(zhBox?.width).toBe(enBox?.width);
    expect(zhBox?.height).toBe(enBox?.height);

    expect(enBox?.width).toBe(jaBox?.width);
    expect(enBox?.height).toBe(jaBox?.height);
  });
});