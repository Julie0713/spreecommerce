import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://demo.spreecommerce.org/');

  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('te');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@mailinator.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Items in cart, View bag' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  await expect(page.locator('#spree_shipping_rate_26279')).toContainText('Delivery in 3-5 business days');
  await expect(page.locator('#spree_shipping_rate_26279')).toContainText('$5.00');
  await expect(page.locator('#spree_shipping_rate_26280')).toContainText('Delivery in 2-3 business days');
  await expect(page.locator('#spree_shipping_rate_26280')).toContainText('$10.00');
  await expect(page.locator('#spree_shipping_rate_26281')).toContainText('Delivery in 1-2 business days');
  await expect(page.locator('#spree_shipping_rate_26281')).toContainText('$15.00');
});