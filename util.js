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

    dragAndDrop() {
        let columna;
        let columnb;
        this.browser.findElement(webdriver.By.css('div[id = "column-a"]')).then((el) => {
            columna = el;
        }).then(() => {
            return this.browser.findElement(webdriver.By.css('div[id = "column-b"]'));
        }).then((el) => {
            columnb = el;
        }).then(() => {
            this.browser.sleep(1000);
        }).then(() => {
            this.browser.actions().mouseMove(columna) //????????????????????????????????????????????????
                .mouseDown()
                .mouseMove(columnb)
                .mouseUp()
                .perform();
        }).then(() => {
            return this.browser.findElement(webdriver.By.css('div[id = "column-a"] header')).getText()
        }).then((text) => {
            console.log(text);
        }).then(() => {
            return this.browser.findElement(webdriver.By.css('div[id = "column-b"] header')).getText()
        }).then((text) => {
            console.log(text);
        })
    }

    mouseOut() {
        this.browser.actions().mouseMove({ x: 1000, y: 1000 });
    }
}

module.exports = Util;




