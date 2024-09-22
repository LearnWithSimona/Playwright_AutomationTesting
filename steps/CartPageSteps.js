import { CartPage } from "../pages/CartPage";

export class CartPageSteps {

    constructor(page) {
        this.page = page; 
        this.cart= new CartPage(this.page);
      }
   
    async insertCheckoutInfo(firstName,lastName,zipOrPostalCode){
        await this.cart.insertFirstName(firstName);
        await this.cart.insertLastName(lastName);
        await this.cart.insertZipOrPostalCode(zipOrPostalCode);
    }

}
