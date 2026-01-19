import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.spreecommerce.org/');
  await page.getByLabel('Top').getByRole('link', { name: 'Shop All' }).click();
  await page.getByRole('link', { name: 'Blue Denim Shirt $55.99' }).click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.locator('#block-40852').getByRole('button', { name: 'Please choose Size' }).click();
  await page.getByRole('menuitem', { name: 'M' }).click();
await page.getByRole('button', { name: 'Add To Cart' }).click();
await page.getByRole('button', { name: 'Close sidebar' }).click();
await page.locator('#block-37889').click();
await page.getByRole('link', { name: 'Gold Bracelet $' }).click();
await page.getByRole('button', { name: 'Add To Cart' }).click();
await page.getByRole('button', { name: 'Close sidebar' }).click();
await page.getByRole('link', { name: 'Sale', exact: true }).click();
await page.getByRole('link', { name: 'Sale Gold-Framed Glasses $74.99 $' }).click();
await page.getByRole('button', { name: 'Add To Cart' }).click();
await page.getByRole('link', { name: 'Checkout' }).click();
await page.getByRole('textbox', { name: 'Email' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('test1@mailinator.com');
await page.getByLabel('Country').selectOption('2581');

await page.getByRole('textbox', { name: 'First name' }).click();
await page.getByRole('textbox', { name: 'First name' }).fill('testt');
await page.getByRole('textbox', { name: 'Last name' }).click();
await page.getByRole('textbox', { name: 'Last name' }).fill('test');
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('red h');
await page.getByRole('option', { name: 'Red Hotel Cubao, Quezon City' }).click();

await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).press('ControlOrMeta+a');
await page.getByRole('textbox', { name: 'Street and house number' }).fill('');
await page.getByRole('textbox', { name: 'Street and house number' }).click();
await page.getByRole('textbox', { name: 'Street and house number' }).fill('red');
await page.getByRole('option', { name: 'Red Hotel Cubao, Quezon City' }).click();

await page.getByRole('button', { name: 'Save and Continue' }).click();
await expect(page.getByText('Delivery', { exact: true })).toBeVisible();

await expect(page.locator('h5')).toContainText('Delivery method from Shop location');



await page.getByRole('radio', { name: 'Standard Delivery in 3-5' }).check();
await page.getByRole('radio', { name: 'Premium Delivery in 2-3' }).check();
await page.getByRole('radio', { name: 'Next Day Delivery in 1-2' }).check();
await page.getByRole('button', { name: 'Save and Continue' }).click();
await expect(page.getByLabel('breadcrumb').getByText('Payment')).toBeVisible();



await page.locator('iframe[name="__privateStripeFrame3376"]').contentFrame().getByTestId('alipay').click();
await page.locator('iframe[name="__privateStripeFrame3376"]').contentFrame().getByTestId('wechat_pay').click();
await page.locator('iframe[name="__privateStripeFrame3376"]').contentFrame().getByTestId('us_bank_account').click();
await page.locator('iframe[name="__privateStripeFrame3376"]').contentFrame().getByTestId('card').click();

});

