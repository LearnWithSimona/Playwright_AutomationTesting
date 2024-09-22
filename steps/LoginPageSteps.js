import { LoginPage } from "../pages/LoginPage"

export class LoginPageSteps {

    constructor(page) {
        this.page = page; // Store the Playwright page object for use in methods
        this.login= new LoginPage(this.page)
      }
   
    
    async loginUser(url, username, password) {
        await this.login.navigateToPage(url)
        await this.login.insertUsername(username)
        await this.login.insertPassword(password)
        await this.login.clickLoginButton()
    }

}
