const { test, expect } = require('@playwright/test');
import { LoginPageSteps } from '../steps/LoginPageSteps';
import { LoginPage } from '../pages/LoginPage';
import { configDotenv } from 'dotenv';

configDotenv();

test.describe('Login Tests', () => {

  let loginPageSteps,loginPage;
  const password=process.env.PASSWORD;
  const loginURL=process.env.BASE_URL;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); 
    loginPageSteps = new LoginPageSteps(page); 
  });

  test('Standard user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.STANDARD_USER,password)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = await page.locator('.title').textContent();
    expect(pageTitle).toBe('Products');
  });

  test('LockedOut user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.LOCKED_OUT_USER,password)
    const lockedOutMessage= page.locator('//h3[@data-test="error"]')
    expect(lockedOutMessage).toBeVisible();
    expect(lockedOutMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
  });

  test('Problem user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.PROBLEM_USER,password)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = await page.locator('.title').textContent();
    expect(pageTitle).toBe('Products');
  });

  test('PerformaceGlitch user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.PERFORMANCE_GLITCH_USE,password)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = await page.locator('.title').textContent();
    expect(pageTitle).toBe('Products');
  });

  test('Error user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.ERROR_USER,password)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = await page.locator('.title').textContent();
    expect(pageTitle).toBe('Products');
  });

  test('Visual user tries to login', async ({ page }) => {
    await loginPageSteps.loginUser(loginURL,process.env.VISUAL_USER,password)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = await page.locator('.title').textContent();
    expect(pageTitle).toBe('Products');
  });

  


});
