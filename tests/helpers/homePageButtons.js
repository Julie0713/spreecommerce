/**
 * Returns reusable locators for homepage buttons
 * @param {import('@playwright/test').Page} page
 */
export function homePageButtons(page) {
    return {
      shopAllBtn: page.locator('#block-6474').getByRole('link', { name: 'Shop All' }),
      shopAllTopBtn: page.getByLabel('Top').getByRole('link', { name: 'Shop All' }),
      wellnessBtn: page.getByRole('link', { name: 'Wellness' }),
      fashionBtn: page.getByLabel('Top').getByRole('link', { name: 'Fashion', exact: true }),
      saleBtn: page.getByLabel('Top').getByRole('link', { name: 'Sale' }),
      accountBtn: page.getByRole('button', { name: 'Open account panel' }),
      cartBtn: page.getByRole('link', { name: 'Items in cart, View bag' }),
    };
  }
  