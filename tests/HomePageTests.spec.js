const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/HomePage';
import { LoginPageSteps } from '../steps/LoginPageSteps';
import { configDotenv } from 'dotenv';

configDotenv();

test.describe('Home Page Tests', () => {

    let loginPageSteps, homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPageSteps = new LoginPageSteps(page)
        await loginPageSteps.loginUser(process.env.BASE_URL, process.env.STANDARD_USER, process.env.PASSWORD)
    });

    test('User tries to logout', async ({ page }) => {
        await homePage.clickHamburgerMenu()
        await homePage.clickLogout()
        await expect(page).toHaveURL(process.env.BASE_URL);
    });

    test('User tries to sort by Name(A to Z)', async ({ page }) => {
       await page.selectOption(homePage.sortingDropdownPath, 'az');
        const itemNames = await page.$$eval('.inventory_item_name', items =>
            items.map(item => item.textContent)
        );
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    test('User tries to sort by Name(Z to A)', async ({ page }) => {
        await page.selectOption(homePage.sortingDropdownPath, 'za');
         const itemNames = await page.$$eval('.inventory_item_name', items =>
             items.map(item => item.textContent)
         );
         const sortedNames = [...itemNames].sort().reverse();
         expect(itemNames).toEqual(sortedNames);
     });

     test('User tries to sort by Price(low to high)', async ({ page }) => {
        await page.selectOption(homePage.sortingDropdownPath, 'lohi');
         const itemNames = await page.$$eval('.inventory_item_name', items =>
             items.map(item => item.textContent)
         );
         const sortedNames = [...itemNames].sort((a, b) => a - b);
         expect(itemNames).toEqual(sortedNames);
     });

     test('User tries to sort by Price(high to low)', async ({ page }) => {
        await page.selectOption(homePage.sortingDropdownPath, 'hilo');
         const itemNames = await page.$$eval('.inventory_item_name', items =>
             items.map(item => item.textContent)
         );
         const sortedNames = [...itemNames].sort((a, b) => b - a)
         expect(itemNames).toEqual(sortedNames);
     });



});
