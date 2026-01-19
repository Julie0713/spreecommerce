import { test, expect } from './helpers/fixtures.js';
import { generateCredentials } from './helpers/credentials.js';
import { homePageButtons } from './helpers/homePageButtons.js';

// keep one set of credentials for both Sign Up and Log In
let creds;


test.beforeAll(() => {
  creds = generateCredentials();
});

test.beforeEach(async ({ page }) => { 
    await page.goto('https://demo.spreecommerce.org/', { waitUntil: 'networkidle', timeout: 90000 });
});

test('Verify user can Sign Up', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    //registration start her
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Password Confirmation' }).fill(password);
    await page.getByRole('button', { name: 'Sign Up' , waitUntil: 'networkidle', timeout: 5000 }).click();
    await expect(page.locator('#flashes')).toContainText('Welcome! You have signed up successfully.');
});

test('Verify user can Log in', async ({ page }) => {
  const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');
});

test('Verify user browse and add products to cart', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //browsing product and adding to cart
    await page.locator('#block-6474').getByRole('link', { name: 'Shop All' }).click();
    await expect(page.locator('#product-257')).toContainText('Blue Denim Shirt');
    await page.getByRole('link', { name: 'Blue Denim Shirt $55.99', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByLabel('Please choose Size').click();
    await page.getByRole('menuitem', { name: 'M' }).click();
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Add To Cart' }).click();
    await page.getByRole('button', { name: 'Close sidebar' }).click();
    await page.getByRole('link', { name: 'New Arrivals', exact: true }).click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#product-272')).toContainText('Gold Bracelet Regular price $99.99');
    await page.getByRole('link', { name: 'Gold Bracelet $' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Add To Cart' }).click();
    await page.waitForTimeout(3000);
});


test('Verify user can view cart and validate name, quantity and price', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //view bag and verify name, quantity and price
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('listitem').filter({ hasText: 'Blue Denim Shirt $55.99 Blue M' }).click();
    await page.locator('$55.99');
    await page.locator('2');
    await page.getByRole('listitem').filter({ hasText: 'Gold Bracelet $99.99 Gold' }).click();
    await page.locator('$99.99');
    await page.locator('1');

});

test('Verify user can proceed to check out items in the cart', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //check out
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('link', { name: 'Checkout', waitUntil: 'networkidle', timeout: 5000 }).click();
    await expect(page.getByText('Cart', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Cart' }).click();
    
});


test('Verify user can add a shipping address after checking out items', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //check out items
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await expect(page.getByText('Address', { exact: true })).toBeVisible();
    await page.getByLabel('Country').selectOption('2581');
    await page.getByRole('textbox', { name: 'First name' }).click();
    await page.getByRole('textbox', { name: 'First name' }).fill('Juan');
    await page.getByRole('textbox', { name: 'Last name' }).click();
    await page.getByRole('textbox', { name: 'Last name' }).fill('Dela Cruz');
    await page.getByRole('textbox', { name: 'Street and house number' }).click();
    await page.getByRole('textbox', { name: 'Street and house number' }).pressSequentially('red h', { delay: 1200 });
    await page.getByRole('option', { name: 'Red Hotel Cubao, Quezon City' }).click();
    await page.getByRole('button', { name: 'Save and Continue'}).click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Delivery', { exact: true })).toBeVisible();
        
});

test('Verify user can select a shipping method', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //add shipping address 
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await page.waitForTimeout(3000);

    //select shipping method
    await expect(page.locator('h5')).toContainText('Delivery method from Shop location');
    await page.getByRole('radio', { name: 'Standard Delivery in 3-5' }).check();
    await page.waitForTimeout(3000);
    await page.getByRole('radio', { name: 'Premium Delivery in 2-3' }).check();
    await page.waitForTimeout(3000);
    await page.getByRole('radio', { name: 'Next Day Delivery in 1-2' }).check();
    await page.waitForTimeout(3000);
});

test('Verify different delivery and pricing options', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await expect(page.getByLabel('breadcrumb').getByText('Delivery')).toBeVisible();

    await expect(page.getByText('Standard Delivery in 3-5 business days $')).toBeVisible();
    await expect(page.getByText('Premium Delivery in 2-3 business days $')).toBeVisible();
    await expect(page.getByText('Next Day Delivery in 1-2 business days $')).toBeVisible();
    await page.getByRole('radio', { name: 'Standard Delivery in 3-5' }).check();
    await page.getByRole('radio', { name: 'Premium Delivery in 2-3' }).check();
    await page.getByRole('radio', { name: 'Next Day Delivery in 1-2' }).check();
    await page.getByRole('button', { name: 'Save and Continue' }).click();
    await page.waitForTimeout(3000);
    await expect(page.getByLabel('breadcrumb').getByText('Payment')).toBeVisible();

});

test('Verify different payment method and payment via card', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');
    await page.getByRole('link', { name: 'Items in cart, View bag', waitUntil: 'networkidle', timeout: 5000 }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await expect(page.getByLabel('breadcrumb').getByText('Payment')).toBeVisible();
    await page.waitForTimeout(3000);

    //payment checking and card payment
    const stripeFrameLocator = page.frameLocator('#checkout_payment_methods iframe[title="Secure payment input frame"]:not([aria-hidden="true"])'      );
    await stripeFrameLocator.getByTestId('card').waitFor({ state: 'visible' });
    await expect(stripeFrameLocator.getByTestId('card')).toBeVisible();
    await expect(stripeFrameLocator.getByTestId('alipay')).toBeVisible();
    await expect(stripeFrameLocator.getByTestId('wechat_pay')).toBeVisible();
    await expect(stripeFrameLocator.getByTestId('us_bank_account')).toBeVisible();
    await expect(stripeFrameLocator.getByLabel('Additional Payment Methods')).toBeVisible();
});

test('Verify order confirmation once payment is done', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel', waitUntil: 'networkidle', timeout: 2000 }).click();
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', waitUntil: 'networkidle', timeout: 5000  }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');
    await page.getByRole('link', { name: 'Items in cart, View bag' }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await page.waitForTimeout(3000);
  
    // payment starts here
    await expect(page.locator('#checkout_payment_methods')).toContainText('Payment');
    await expect(page.locator('#checkout_payment_methods')).toContainText('All transactions are secure and encrypted');
    const stripeFrameLocator = page.frameLocator('#checkout_payment_methods iframe[title="Secure payment input frame"]:not([aria-hidden="true"])');
    await stripeFrameLocator.getByRole('textbox', { name: 'Card number' }).waitFor({ state: 'visible' });
    await expect(stripeFrameLocator.getByRole('textbox', { name: 'Card number' })).toBeVisible();
    await stripeFrameLocator.getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
    await page.waitForTimeout(3000);
    await expect(stripeFrameLocator.getByRole('textbox', { name: 'Expiration date MM / YY' })).toBeVisible();
    await stripeFrameLocator.getByRole('textbox', { name: 'Expiration date MM / YY' }).fill('01 / 30');
    await page.waitForTimeout(3000);
    await expect(stripeFrameLocator.getByRole('textbox', { name: 'Security code' })).toBeVisible();
    await page.waitForTimeout(3000);
    await stripeFrameLocator.getByRole('textbox', { name: 'Security code' }).fill('111');
    await expect(page.getByRole('button', { name: 'Pay now' })).toBeVisible();
    await page.getByRole('button', { name: 'Pay now' }).click();
    await page.waitForTimeout(3000);
    await expect(page.getByText(/^Order/)).toBeVisible();
    await expect(page.getByText('Your order is confirmed!')).toBeVisible();
    await expect(page.locator('h4')).toContainText('Thanks Juan for your order!');
  });
  
  
  



