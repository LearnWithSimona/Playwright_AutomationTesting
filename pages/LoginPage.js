export class LoginPage{

   constructor(page) {
      this.page = page; 
    }

    usernameFieldPath ='//input[@id="user-name"]';
    passwordFieldPath = '//input[@id="password"]';
    loginButtonPath = '//input[@id="login-button"]';  

     async navigateToPage(url){
        await this.page.goto(url)
     }
     
     async insertUsername(username){
        const usernameField = this.page.locator(this.usernameFieldPath);
        await usernameField.fill(username)
     }

     async insertPassword(password){
      const passwordField = this.page.locator(this.passwordFieldPath);
      await passwordField.fill(password)
     }

     async clickLoginButton(){
      const loginButton = this.page.locator(this.loginButtonPath);
        await loginButton.click()
     }

}
