import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.spreecommerce.org/');

  await page.getByRole('link', { name: 'Items in cart, View bag' }).click();
  await page.getByRole('link', { name: 'Continue shopping' }).click();
  await page.getByRole('link', { name: 'Short Sleeve Printed Shirt $' }).click();
  await page.locator('#block-40852').getByRole('button', { name: 'Please choose Size' }).click();
  await page.getByRole('menuitem', { name: 'M' }).click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();

  await page.getByLabel('Country').selectOption('2581');
  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'Street and house number' }).click();
  await page.getByRole('textbox', { name: 'Street and house number' }).fill('manda');
  await page.getByRole('option', { name: 'Mandaluyong City, Metro Manila, Philippines', exact: true }).click();
await page.getByRole('button', { name: 'Save and Continue' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('as');
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('option', { name: 'Asingan, Pangasinan,' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('as');
await page.getByRole('option', { name: 'Asingan, Pangasinan,' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).dblclick();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('as');
await page.getByRole('option', { name: 'Asingan, Pangasinan,' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('red');
await page.getByRole('option', { name: 'Red Planet BGC The Fort, 40th' }).click();
await page.getByRole('button', { name: 'Save and Continue' }).click();
await expect(page.locator('#spree_shipping_rate_26415')).toContainText('Delivery in 3-5 business days');
await expect(page.getByText('Standard Delivery in 3-5 business days $')).toBeVisible();
await expect(page.getByText('$5.00')).toBeVisible();
await expect(page.locator('#spree_shipping_rate_26416')).toContainText('Premium Delivery in 2-3 business days $10.00');

await expect(page.locator('#spree_shipping_rate_26416')).toContainText('Delivery in 2-3 business days');
await expect(page.locator('#spree_shipping_rate_26416')).toContainText('$10.00');
await expect(page.getByText('Next Day Delivery in 1-2 business days $')).toBeVisible();
await expect(page.locator('#spree_shipping_rate_26417')).toContainText('Delivery in 1-2 business days');
await expect(page.locator('#spree_shipping_rate_26417')).toContainText('$15.00');




await expect(page.getByText('Standard Delivery in 3-5 business days $')).toBeVisible();
await expect(page.getByText('Premium Delivery in 2-3 business days $')).toBeVisible();
await expect(page.getByText('Next Day Delivery in 1-2 business days $')).toBeVisible();

await page.getByRole('radio', { name: 'Standard Delivery in 3-5' }).check();
await page.getByRole('radio', { name: 'Premium Delivery in 2-3' }).check();
await page.getByRole('radio', { name: 'Next Day Delivery in 1-2' }).check();