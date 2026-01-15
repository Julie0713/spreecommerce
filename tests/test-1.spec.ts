import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...

  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('button', { name: 'Open account panel' }).click();
  await page.getByRole('heading', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
});