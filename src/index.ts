import { chromium, Browser, Page } from "../playwright/node_modules/playwright";
import { defineConfig } from "../playwright/node_modules/@playwright/test";

export default defineConfig({
  use: {
    testIdAttribute: "data-pw",
  },
});

// Sleep helper
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runTest() {
  let browser: Browser | undefined;
  let page: Page | undefined;

  try {
    // Browser launch
    browser = await chromium.launch({
      headless: false,
      channel: "chrome",
    });
    page = await browser.newPage();

    // Open desired page
    await page.goto("https://www.cocampo.com/es/en/");

    // Accept cookies; sometimes fails;
    sleep(2000)
    await page.click('[data-pw="cocampoTest-main-acceptButton"]');

    // Click login icon
    sleep(3000)
    await page.click('[data-pw="cocampoTest-main-profileButton"]');

    // Fill the input forms with desired credentials
    await page.type("id=:r1:", "mateuszsadowski24@gmail.com");
    await page.fill('input[type="password"]', "Mateusz42!@#!");

    // Log in
    for (const input_element of await page.getByRole("button").all())
      if ((await input_element.innerText()) == "Login") {
        await input_element.click();
        break;
      }
    
    try {
      // Click on the profile icon and select My Profile
      await sleep(2000)
      let isLoggedIn: boolean = false
      await page.click('[data-pw="cocampoTest-main-profileButton"]');

      for (const input_element of await page.getByText("Sign Out").all()){
          isLoggedIn = true;
        }

      if (isLoggedIn) {
        console.log("User login completed successfully.");
      } 
    } catch (error){
      console.log("User login failed.");
    }


  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser session
    if (browser) {
      await browser.close();
    }
  }
}

runTest();
