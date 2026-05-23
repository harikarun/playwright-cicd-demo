import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Add item to shopping cart', async ({ page }, testInfo) => {
  // Create a unique file name for each browser (e.g., retry-tracker-webkit.txt)
  const browserName = testInfo.project.name;
  const counterFile = path.join(__dirname, `retry-tracker-${browserName}.txt`);

  let attemptCounter = 1;

  if (fs.existsSync(counterFile)) {
    const savedCount = parseInt(fs.readFileSync(counterFile, 'utf8'), 10);
    attemptCounter = savedCount + 1;
  }

  fs.writeFileSync(counterFile, attemptCounter.toString(), 'utf8');
  
  await page.goto('https://www.saucedemo.com/');
  
  if (attemptCounter === 1) {
    throw new Error('Simulated network infrastructure timeout flaw!');
  }

  // Clean up the unique browser file if it passes
  if (fs.existsSync(counterFile)) {
    fs.unlinkSync(counterFile);
  }

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toHaveText('Products');
});