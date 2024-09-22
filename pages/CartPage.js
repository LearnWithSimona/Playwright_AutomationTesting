import { vsprintf } from 'sprintf-js';
export class CartPage {

    constructor(page) {
        this.page = page;
    }

    generateRandomString(length, type = 'both') {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        let characterSet = '';
    
        if (type === 'letters') {
            characterSet = letters;
        } else if (type === 'numbers') {
            characterSet = numbers;
        } else {
            characterSet = letters + numbers; 
        }
    
        return Array.from({ length }, () => 
            characterSet[Math.floor(Math.random() * characterSet.length)]
        ).join('');
    }


    getRandomElement(arr) {
        if (arr.length === 0) 
            return null; 
        const index = Math.floor(Math.random() * arr.length); 
        return arr[index]; 
    }

    addToCartButtonPath='//div[text()="%s"]//ancestor::div[@class="inventory_item_description"]//div[@class="pricebar"]//button[text()="Add to cart"]'
    shoppingCartButtonPath='//div[@id="shopping_cart_container"]'
    checkOutButtonPath='//button[@id="checkout"]'
    firstNameFieldPath='//input[@id="first-name"]'
    lastNameFieldPath='//input[@id="last-name"]'
    zipOrPostalCodeFieldPath='//input[@id="postal-code"]'
    continueButtonPath='//input[@id="continue"]'
    itemForCheckoutPath='//div[text()="%s"]'
    checkoutAmountPath='//div[@class="summary_total_label"]'
    itemTotalPath='//div[@class="summary_subtotal_label"]'
    taxPath='//div[@class="summary_tax_label"]'
    checkoutMessagePath='//div[@class="checkout_complete_container"]'
    removeButtonPath='//div[text()="%s"]//ancestor::div[@class="cart_item_label"]//div[@class="item_pricebar"]//button[text()="Remove"]'

    products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)']

    async insertFirstName(firstName) {
        const firstnameField = this.page.locator(this.firstNameFieldPath);
        await firstnameField.fill(firstName)
    }

    async insertLastName(lastName) {
        const lastNameField = this.page.locator(this.lastNameFieldPath);
        await lastNameField.fill(lastName)
    }

    async insertZipOrPostalCode(zipOrPostalCode) {
        const zipPostalCodeField = this.page.locator(this.zipOrPostalCodeFieldPath);
        await zipPostalCodeField.fill(zipOrPostalCode)
    }

    async clickShoppingCart() {
        const shoppingCartButton = this.page.locator(this.shoppingCartButtonPath);
        await shoppingCartButton.click();
    }

    async clickContinue() {
        const continueButton = this.page.locator(this.continueButtonPath);
        await continueButton.click();
    }

    async clickCheckOut() {
        const checkoutButton = this.page.locator(this.checkOutButtonPath);
        await checkoutButton.click();
    }

    async clickRemove(product) {
        const removeButton = this.page.locator(vsprintf(this.removeButtonPath,[product]));
        await removeButton.click();
    }

    async addToCart(product) {
        const addToCartButton = this.page.locator(vsprintf(this.addToCartButtonPath,[product]));
        await addToCartButton.click()
    }

}
