// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { DashboardPage } from '../pages/DashboardPage';

// test.describe('Login Tests', () => {

//   test('successful login', async ({ page }) => {
//     const loginPage: LoginPage = new LoginPage(page);
//     const dashboardPage: DashboardPage = new DashboardPage(page);

//     await loginPage.goto();
//     await loginPage.login('Admin', 'admin123');

//     await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

//     const url: string = await dashboardPage.getCurrentUrl();
//     expect(url).toContain('dashboard');
//   });

//   test('failed login with wrong password', async ({ page }) => {
//     const loginPage: LoginPage = new LoginPage(page);

//     await loginPage.goto();
//     await loginPage.login('Admin', 'wrongpass');

//     await expect(page.locator('.oxd-alert-content-text'))
//     .toBeVisible({ timeout: 5000 });

//     const errorMessage: string = await loginPage.getErrorMessage();
//     expect(errorMessage).toContain('Invalid credentials');
//   });

// });
// ``

import { test, expect } from '../fixtures/basetest';

test.describe('Login Tests', () => {


test('@smoke successful login', async ({ loginPage, page }) => {

  await loginPage.goto();

const username: string = process.env.APP_USERNAME ?? '';
const password: string = process.env.APP_PASSWORD ?? '';

  await loginPage.loginWithRetry(username, password);


  const currentUrl: string = page.url();

  if (!currentUrl.includes('dashboard')) {
      const errorText: string = (await page.locator('.oxd-alert-content-text')
        .textContent()) ?? 'No error message';

    throw new Error(`Login failed. URL: ${currentUrl}, Error: ${errorText}`);
  }

  await expect(page).toHaveURL(/dashboard/);
});

  test('@smoke failed login', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login('Admin', 'wrongpass');

    const error: string = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid');
  });

test('@regression successful login', async ({ loginPage, page }) => {

  await loginPage.goto();

const username: string = process.env.APP_USERNAME ?? '';
const password: string = process.env.APP_PASSWORD ?? '';

  await loginPage.loginWithRetry(username, password);


  const currentUrl: string = page.url();

  if (!currentUrl.includes('dashboard')) {
      const errorText: string = (await page.locator('.oxd-alert-content-text')
        .textContent()) ?? 'No error message';

    throw new Error(`Login failed. URL: ${currentUrl}, Error: ${errorText}`);
  }

  await expect(page).toHaveURL(/dashboard/);
});

  test('@regression failed login', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login('Admin', 'wrongpass');

    const error: string = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid');
  });

console.log('USERNAME:', process.env.APP_USERNAME);
console.log('PASSWORD:', process.env.APP_PASSWORD);


});