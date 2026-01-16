import { test, expect } from './helpers/fixtures.js';
import { generateCredentials } from './helpers/credentials.js';

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
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'Open account panel' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: 'Sign Up' }).click();
        await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
        //registration start her
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
        await page.getByRole('textbox', { name: 'Password Confirmation' }).fill(password);
        await page.getByRole('button', { name: 'Sign Up' }).click();
        await expect(page.locator('#flashes'))
            .toContainText('Welcome! You have signed up successfully.');
        await page.getByRole('link', { name: 'Open account panel' }).click();
        await expect(page.locator('h1')).toContainText('My Account');
        await page.getByRole('button', { name: 'Log out' }).click();
        await page.waitForTimeout(1000);
        await expect(page.locator('#flashes')).toContainText('Signed out successfully.');
});

test('Verify user can Log in', async ({ page }) => {
  const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel' }).click();
    await page.waitForTimeout(2000);
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');
});

test('Verify user browse and add products to cart', async ({ page }) => {
    const { email, password } = creds;
    await page.getByRole('button', { name: 'Open account panel' }).click();
    await page.waitForTimeout(2000);
    // make sure login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flashes')).toContainText('Signed in successfully.');

    //browsing product and adding to cart
    await page.locator('#block-6474').getByRole('link', { name: 'Shop All' }).click();
    await expect(page.locator('#product-257')).toContainText('Blue Denim Shirt');
    await page.getByRole('link', { name: 'Blue Denim Shirt $55.99' }).click();
    await expect(page.locator('#block-40849')).toContainText('$55.99');
    await page.getByLabel('Please choose Size').click();
    await page.getByRole('menuitem', { name: 'M' }).click();
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(page.locator('#block-40851')).toContainText('2');
    await page.getByRole('button', { name: 'Add To Cart' }).click();
    await page.getByRole('button', { name: 'Close sidebar' }).click();
    await page.getByRole('link', { name: 'New Arrivals', exact: true }).click();
    await expect(page.locator('#product-272')).toContainText('Gold Bracelet');
    await page.getByRole('link', { name: 'Gold Bracelet $' }).click();
    await expect(page.locator('#block-40849')).toContainText('$99.99');
    await page.getByRole('button', { name: 'Add To Cart' }).click();
    await page.getByRole('button', { name: 'Close sidebar' }).click();
    await page.getByRole('link', { name: 'Sale', exact: true }).click();
    await expect(page.locator('#product-277')).toContainText('Gold-Framed Glasses');
    await page.getByRole('link', { name: 'Sale Gold-Framed Glasses $74.99 $' }).click();
    await expect(page.locator('#block-40849')).toContainText('$54.99');
    await page.getByRole('button', { name: 'Add To Cart' }).click();


});
