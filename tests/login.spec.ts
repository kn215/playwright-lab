import { test, expect } from '@playwright/test'

test('logs in with valid crednetials', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name : 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('reject incorrect password', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('incorrect_password');
    await page.getByRole('button', { name : 'Login'}).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com');
} )

