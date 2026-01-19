import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('await page.goto('https://demo.spreecommerce.org/');
  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@mailinator.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test123');
  await page.getByRole('button', { name: 'Login' }).click();


  await page.getByRole('link', { name: 'Gold Bracelet $' }).click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await page.locator('#block-37890').click();
  await page.getByRole('link', { name: 'Sale', exact: true }).click();
  await page.getByRole('link', { name: 'Sale Gold-Framed Glasses $74.99 $' }).click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();



  await page.getByText('$266.96').click();

  await page.getByRole('link', { name: 'Items in cart, View bag' }).click();

  await page.getByText('Shipping & taxes calculated')
  await page.getByText('Total $')
  await page.getByText('$266.96')

  await page.getByRole('link', { name: 'Checkout' }).click();

  await page.getByLabel('Country').selectOption('2581');
  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('test1');
  await page.getByRole('textbox', { name: 'Last name' }).click();
  await page.getByRole('textbox', { name: 'Last name' }).fill('account');
  await page.getByRole('textbox', { name: 'Street and house number' }).click();
  await page.getByRole('textbox', { name: 'Street and house number' }).fill('red h');
  await page.getByRole('option', { name: 'Red Hotel Cubao, Quezon City' }).click();

  await page.getByRole('button', { name: 'Save and Continue' }).click();
  await page.goto('https://demo.spreecommerce.org/checkout/nDMXA2C3NVY39L6Jo4Qitb3g6TmpBRMEFEi/delivery');
  await expect(page.locator('h5')).toContainText('Delivery method from Shop location');

  await expect(page.locator('#spree_shipping_rate_25672')).toContainText('Standard Delivery in 3-5 business days');
  await expect(page.locator('#spree_shipping_rate_25672')).toContainText('$5.00');
  await expect(page.locator('#spree_shipping_rate_25673')).toContainText('Premium Delivery in 2-3 business days');
  await expect(page.locator('#spree_shipping_rate_25673')).toContainText('$10.00');
  await expect(page.locator('#spree_shipping_rate_25674')).toContainText('Next Day Delivery in 1-2 business days');
  await expect(page.locator('#spree_shipping_rate_25674')).toContainText('$15.00');

  await page.getByRole('radio', { name: 'Next Day Delivery in 1-2' }).check();
  await page.getByRole('button', { name: 'Save and Continue' }).click();


  await expect(page.locator('#checkout')).toContainText('Account test1 account test1@mailinator.com');

  await expect(page.locator('#checkout')).toContainText('test1 account, 627 Epifanio de los Santos Avenue, Quezon City, 1109, Philippines');

  await expect(page.locator('#checkout')).toContainText('Next Day · $0.00');

  await expect(page.locator('#billing-address')).toContainText('Billing Address');
  await expect(page.locator('#billing-address')).toContainText('Use shipping address');

  await expect(page.locator('#checkout_payment_methods')).toContainText('Payment');
  await expect(page.locator('#checkout_payment_methods')).toContainText('All transactions are secure and encrypted');
  await expect(page.locator('iframe[name="__privateStripeFrame9246"]').contentFrame().locator('form')).toContainText('Card number');

  await page.locator('iframe[name="__privateStripeFrame9246"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
  await page.locator('iframe[name="__privateStripeFrame9246"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
  await page.locator('iframe[name="__privateStripeFrame9246"]').contentFrame().getByRole('textbox', { name: 'Expiration date MM / YY' }).fill('01 / 30');
  await page.locator('iframe[name="__privateStripeFrame9246"]').contentFrame().getByRole('textbox', { name: 'Security code' }).fill('111');
  await expect(page.locator('#payment-and-conditions')).toContainText('By placing this order you agree to Terms of Service and Privacy Policy.');
  await expect(page.getByRole('button', { name: 'Pay now' })).toBeVisible();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.goto('https://demo.spreecommerce.org/checkout/nDMXA2C3NVY39L6Jo4Qitb3g6TmpBRMEFEi/complete');


  await expect(page.locator('#order_12648')).toContainText('Order R962625850');
  await expect(page.locator('h4')).toContainText('Thanks test1 for your order!');
  await expect(page.locator('#order_12648')).toContainText('Your order is confirmed!');
  await expect(page.locator('#order_12648')).toContainText('Payment');
  await expect(page.locator('#order_12648')).toContainText('Visa •••• 4242 Expiration 1/2030');
  await expect(page.locator('#order_12648')).toContainText('Status Paid');
  await expect(page.locator('#order_12648')).toContainText('Contact information');
  await expect(page.locator('#order_12648')).toContainText('test1@mailinator.com');

  await expect(page.locator('#order_12648')).toContainText('Shipping Address');
  await expect(page.locator('#order_12648')).toContainText('test1 account627 Epifanio de los Santos AvenueQuezon City, 1109Philippines');
  await expect(page.locator('#order_12648')).toContainText('Billing Address');
  await expect(page.locator('#order_12648')).toContainText('test1 account627 Epifanio de los Santos AvenueQuezon City, 1109Philippines');

});