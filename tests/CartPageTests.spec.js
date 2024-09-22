const { test, expect } = require('@playwright/test');
import { CartPage } from '../pages/CartPage';
import { CartPageSteps } from '../steps/CartPageSteps';
import { LoginPageSteps } from '../steps/LoginPageSteps';
import { vsprintf } from 'sprintf-js';
import { configDotenv } from 'dotenv';

configDotenv();

test.describe('Cart Page Tests', () => {

  let cartPageSteps,cartPage,loginPageSteps;
  let randomProduct,firstName,lastName,zipOrPostalCode;
  
  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page); 
    cartPageSteps = new CartPageSteps(page);
    loginPageSteps = new LoginPageSteps(page)
    await loginPageSteps.loginUser(process.env.BASE_URL,process.env.STANDARD_USER,process.env.PASSWORD)
    firstName= cartPage.generateRandomString(7,'letters')
    lastName= cartPage.generateRandomString(7,'letters')
    zipOrPostalCode=cartPage.generateRandomString(7,'numbers')
  });

  test('User tries to checkout a product', async ({ page }) => {
    randomProduct=cartPage.getRandomElement(cartPage.products)
    await cartPage.addToCart(randomProduct)
    await cartPage.clickShoppingCart()
    await cartPage.clickCheckOut()
    await cartPageSteps.insertCheckoutInfo(firstName,lastName,zipOrPostalCode)
    await cartPage.clickContinue()
    let checkoutProduct= page.locator(vsprintf(cartPage.itemForCheckoutPath,[randomProduct]))
    expect(await checkoutProduct.textContent()).toContain(randomProduct)
    let itemPrice = (await page.locator(cartPage.itemTotalPath).innerText()).split(' ')[2].replace('$', '')
    let taxAmount = (await page.locator(cartPage.taxPath).innerText()).split(' ')[1].replace('$', '')
    let checkoutPrice= page.locator(cartPage.checkoutAmountPath)
    let sumOfItemTax= Number(itemPrice)+Number(taxAmount)
    expect(await checkoutPrice.textContent()).toContain(sumOfItemTax.toString());

  });

  test('User tries to checkout a removed product', async ({ page }) => {
    randomProduct=cartPage.getRandomElement(cartPage.products)
    await cartPage.addToCart(randomProduct)
    await cartPage.clickShoppingCart()
    await cartPage.clickRemove(randomProduct)
    await expect(page.locator(cartPage.checkOutButtonPath)).toBeDisabled()
    
  });



});
