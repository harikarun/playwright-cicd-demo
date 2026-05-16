const { test, expect } = require('@playwright/test');

   test('Successful User Login', async ({ page }) => {
     // Go to the baseURL defined in our config
     await page.goto('/'); 

     // Use environment variables for credentials
     await page.locator('[data-test="username"]').fill(process.env.QA_USERNAME);
     await page.locator('[data-test="password"]').fill(process.env.QA_PASSWORD);
     await page.locator('[data-test="login-button"]').click();

     // Verify successful login by checking the inventory page header
     await expect(page.locator('.title')).toHaveText('Products');
   });