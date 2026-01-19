import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://demo.spreecommerce.org/');
  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@mailinator.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Kitkat_07136');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Items in cart, View bag' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();

  await expect(page.locator('#spree_shipping_rate_26279')).toContainText('Delivery in 3-5 business days');
  await page.getByRole('button', { name: 'Save and Continue' }).click();
  await page.getByText('Add a new card').click();

  await page.getByRole('button', { name: 'Pay now' }).click();

  await expect(page.locator('#order_12685')).toContainText('Your order is confirmed!');
  await expect(page.locator('h4')).toContainText('Thanks test1 for your order!');
  await expect(page.locator('#order_12685')).toContainText('Order');
  await expect(page.getByText('Status Paid')).toBeVisible();
});