import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Define a safe path to store our temporary counter file
const counterFile = path.join(__dirname, 'retry-tracker.txt');

test('Add item to shopping cart', async ({ page }) => {
  let attemptCounter = 1;

  // If the tracker file already exists, read it to see what attempt we are on
  if (fs.existsSync(counterFile)) {
    const savedCount = parseInt(fs.readFileSync(counterFile, 'utf8'), 10);
    attemptCounter = savedCount + 1;
  }

  // Save the updated attempt number back to the tracker file
  fs.writeFileSync(counterFile, attemptCounter.toString(), 'utf8');
  
  await page.goto('https://www.saucedemo.com/');
  
  // Force failure ONLY on the very first execution attempt
  if (attemptCounter === 1) {
    throw new Error('Simulated network infrastructure timeout flaw!');
  }

  // Clean up the tracker file if the test passes (on retry)
  if (fs.existsSync(counterFile)) {
    fs.unlinkSync(counterFile);
  }

  // Your standard test execution code goes below here:
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toHaveText('Products');
});