var webdriver = require("selenium-webdriver");

class Util {

    constructor() {
        this.browser = this.createDriver();
    }

    createDriver() {
        var driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().timeouts().implicitlyWait(20000);
        driver.manage().window().maximize();
        return driver;
    }

    closeBrowser() {
        this.browser.quit();
    }

    openUrl(url) {
        return this.browser.get(url);
    }

    authorize(url, login, password) {
        const addr = url.slice(7);
        return this.browser.get(`http://${login}:${password}@${addr}`);
    }

    findBrokenImages() {
        this.browser.findElements(webdriver.By.css("img")).then((images) => {
            images.forEach((img) => {
                img.getAttribute("naturalWidth").then((width) => {
                    if (width == 0) {
                        img.getAttribute("outerHTML").then((html) => {
                            console.log(html + " is broken")
                        })
                    }
                })
            })
        })
    }

}

module.exports = Util;




