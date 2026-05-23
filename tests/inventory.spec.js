import { test, expect } from '@playwright/test';

// A counter that persists across retries inside the same worker process
let attemptCounter = 0;

test('Add item to shopping cart', async ({ page }) => {
  attemptCounter++;
  
  await page.goto('https://www.saucedemo.com/');
  
  // Force failure ONLY on the very first execution attempt
  if (attemptCounter === 1) {
    throw new Error('Simulated network infrastructure timeout flaw!');
  }

  // Your standard test execution code goes below here:
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toHaveText('Products');
});