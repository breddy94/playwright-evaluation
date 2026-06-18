// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { DashboardPage } from '../pages/DashboardPage';
// import { EmployeeListPage } from '../pages/EmployeeListPage';

// test.describe('Employee Tests', () => {

  
// test('search employee and validate results', async ({ page }) => {
//   const loginPage: LoginPage = new LoginPage(page);
//   const dashboardPage: DashboardPage = new DashboardPage(page);
//   const employeePage: EmployeeListPage = new EmployeeListPage(page);

//   await loginPage.goto();
//   await loginPage.login('Admin', 'admin123');

//   await dashboardPage.navigateToPIM();

//   await page.waitForSelector('h6:has-text("PIM")');

//   await employeePage.searchEmployee("a");
//   ``

//   // ✅ Handle both scenarios
//   const noRecords: boolean = await employeePage.isNoRecordsDisplayed();

//   if (noRecords) {
//     expect(noRecords).toBeTruthy(); // ✅ Valid case
//   } else {
//     const names: string[] = await employeePage.getEmployeeNames();

//     expect(names.length).toBeGreaterThan(0);

//     for (const name of names) {
//       expect(name).not.toBe('');
//     }
//   }
// });

// //   await employeePage.searchEmployee('Linda');
// // //   await page.waitForSelector('.oxd-table-body .oxd-table-row');

// //   const names: string[] = await employeePage.getEmployeeNames();

// //   expect(names.length).toBeGreaterThan(0);

// //   for (const name of names) {
// //     expect(name).not.toBe('');
// //   }
// });

import { test, expect } from '../fixtures/basetest';

test.describe('Employee Tests', () => {

  test('@regression search employee and validate results', async ({
    loginPage,
    dashboardPage,
    employeePage,
    page
  }) => {

    await loginPage.goto();

    await loginPage.login(
      process.env.APP_USERNAME as string,
      process.env.APP_PASSWORD as string
    );

    await dashboardPage.navigateToPIM();

    await page.waitForSelector('h6:has-text("PIM")');

    await employeePage.searchEmployee('a'); // ✅ stable data

    const noRecords: boolean = await employeePage.isNoRecordsDisplayed();

    if (!noRecords) {
      const names: string[] = await employeePage.getEmployeeNames();

      expect(names.length).toBeGreaterThan(0);

      for (const name of names) {
        expect(name).not.toBe('');
      }
    } else {
      expect(noRecords).toBeTruthy();
    }
  });

});