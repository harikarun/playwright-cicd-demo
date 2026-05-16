const { test, expect } = require('@playwright/test');

   test('Add item to shopping cart', async ({ page }) => {
     await page.goto('/'); 
     await page.locator('[data-test="username"]').fill(process.env.QA_USERNAME);
     await page.locator('[data-test="password"]').fill(process.env.QA_PASSWORD);
     await page.locator('[data-test="login-button"]').click();

     // Click "Add to cart" for the first item
     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

     // Validate badge updates to "1"
     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
   });