"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("../playwright/node_modules/playwright");
const test_1 = require("../playwright/node_modules/@playwright/test");
exports.default = (0, test_1.defineConfig)({
    use: {
        testIdAttribute: "data-pw",
    },
});
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
function runTest() {
    return __awaiter(this, void 0, void 0, function* () {
        let browser;
        let page;
        try {
            browser = yield playwright_1.chromium.launch({
                headless: false,
                channel: "chrome",
            });
            page = yield browser.newPage();
            yield page.goto("https://www.cocampo.com/es/en/");
            sleep(2000);
            yield page.click('[data-pw="cocampoTest-main-acceptButton"]');
            sleep(3000);
            yield page.click('[data-pw="cocampoTest-main-profileButton"]');
            yield page.type("id=:r1:", "mateuszsadowski24@gmail.com");
            yield page.fill('input[type="password"]', "Mateusz42!@#!");
            for (const input_element of yield page.getByRole("button").all())
                if ((yield input_element.innerText()) == "Login") {
                    yield input_element.click();
                    break;
                }
            try {
                yield sleep(2000);
                let isLoggedIn = false;
                yield page.click('[data-pw="cocampoTest-main-profileButton"]');
                for (const input_element of yield page.getByText("Sign Out").all()) {
                    isLoggedIn = true;
                }
                if (isLoggedIn) {
                    console.log("User login completed successfully.");
                }
            }
            catch (error) {
                console.log("User login failed.");
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
        finally {
            if (browser) {
                yield browser.close();
            }
        }
    });
}
runTest();
//# sourceMappingURL=index.js.map