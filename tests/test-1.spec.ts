import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.spreecommerce.org/');
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open wishlist' }).click();
  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('button', { name: 'Open account panel' }).dblclick();
  await page.getByRole('button', { name: 'Open account panel' }).dblclick();
});
await page.getByRole('button', { name: 'Open account panel' }).dblclick();