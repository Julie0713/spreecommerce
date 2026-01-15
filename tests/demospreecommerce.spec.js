// @ts-check
import { test, expect } from '@playwright/test';

//Reusabel Locators
const homePageButtons = (page /** @type {Page} */) => ({
    shopAllBtn: page.locator('#block-6474').getByRole('link', { name: 'Shop All' }),
    shopAllTopBtn: page.getByLabel('Top').getByRole('link', { name: 'Shop All' }),
    wellnessBtn: page.getByRole('link', { name: 'Wellness' }),
    fashionBtn: page.getByLabel('Top').getByRole('link', { name: 'Fashion', exact: true }),
    saleBtn: page.getByLabel('Top').getByRole('link', { name: 'Sale' }),
    accountBtn: page.getByRole('button', { name: 'Open account panel' }),
    cartBtn: page.getByRole('link', { name: 'Items in cart, View bag' }),


});


test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.spreecommerce.org/');
});


test('Verify page loads successfull', async ({ page }) => {
    // Expect a title 
    await expect(page.locator('#block-6472')).toContainText('Welcome to this Spree Commerce demo website');
});

test('Verify critical page icons are visible and clickable', async ({ page }) => {
    //Expect following icons are visible
    const buttons = homePageButtons(page);
    await expect(buttons.accountBtn).toBeVisible();
    await expect(buttons.cartBtn).toBeVisible();
    await expect(buttons.shopAllBtn).toBeVisible();
    await expect(buttons.shopAllTopBtn).toBeVisible();
    await expect(buttons.wellnessBtn).toBeVisible();
    await expect(buttons.fashionBtn).toBeVisible();
    await expect(buttons.saleBtn).toBeVisible();

    await page.locator('#block-6474').getByRole('link', { name: 'Shop All' }).click();
    await expect(page.locator('h1')).toContainText('Shop All');

    await page.getByRole('link', { name: 'Fashion', exact: true }).click();
    await expect(page.locator('h1')).toContainText('Fashion');

    await page.getByRole('link', { name: 'Wellness' }).click();
    await expect(page.locator('h1')).toContainText('Wellness');

    await page.getByRole('link', { name: 'New Arrivals', exact: true }).click();
    await expect(page.locator('h1')).toContainText('New Arrivals');

    await page.getByRole('link', { name: 'Sale', exact: true }).click();
    await expect(page.locator('h1')).toContainText('On Sale');
});

test('Verify side menu open correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Open account panel' }).click();
    await expect(page.locator('#slideover-account')).toContainText('Account');
});