import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/login-page';
import users from '../data/users.json';

test('logs in via page object', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('product page loads after login', async ({page}) => {
    const loginPage= new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.getByRole('button', {name: 'Open Menu'})).toBeVisible;
});

test('waiting for dynamic text', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.getByRole('button', {name: 'Start'}).click();
    // Assertion will retry until element appears
    await expect(page.locator('#finish')).toHaveText('Hello World!');
});

for (const u of users) {
  test(`login as ${u.name} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(u.user, u.pass);

    if (u.shouldPass) {
      await expect(page).toHaveURL(/inventory/);
    } else {
      await expect(page.getByText('epic sadface')).toBeVisible();
    }
  });
}