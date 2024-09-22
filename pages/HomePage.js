import { vsprintf } from 'sprintf-js';
export class HomePage{

    constructor(page) {
       this.page = page; 
     }
 
     hamburgerMenuButtonPath='//div[@class="bm-burger-button"]' 
     logoutPath='//a[@id="logout_sidebar_link"]'
     sortingDropdownPath='//select[@class="product_sort_container"]'
     sortingOptionsPath='//option[@value="%s"]'
 
      async clickHamburgerMenu(){
         const hamburgerMenuButton = this.page.locator(this.hamburgerMenuButtonPath)
         await hamburgerMenuButton.click()
      }

      async clickLogout(){
        const logoutButton = this.page.locator(this.logoutPath)
        await logoutButton.click()
      }

 
 }
 