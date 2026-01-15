// @ts-check
import { test, expect } from '@playwright/test';

test('Verify page loads successfull', async ({ page }) => {
  await page.goto('https://demo.spreecommerce.org/');

  // Expect a title "
  await expect(page.locator('#block-6472')).toContainText('Welcome to this Spree Commerce demo website');
});

test('Verify page loads successfull', async ({ page }) => {
    await page.goto('https://demo.spreecommerce.org/');
  
    // Expect a title "
    await expect(page.locator('#block-6472')).toContainText('Welcome to this Spree Commerce demo website');
  });




// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });