import { test, expect } from '@playwright/test'

test('checks the first checkbox', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const firstBox = page.locator('input[type="checkbox"]').first();
    await firstBox.check();
    await expect(firstBox).toBeChecked();
});