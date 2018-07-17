const webdriver = require("selenium-webdriver");
const fs = require("fs");

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
        const script = fs.readFileSync("dnd.js");
        this.browser.executeScript(script + "$('#column-a').simulateDragDrop({ dropTarget: '#column-b'});")
            .then(() => {
                return this.browser.findElement(webdriver.By.css('div[id = "column-a"] header')).getText()
            }).then((text) => {
                if (text === "B") console.log("Column A changed");
            }).then(() => {
                return this.browser.findElement(webdriver.By.css('div[id = "column-b"] header')).getText()
            }).then((text) => {
                if (text === "A") console.log("Column B changed");
            })
    }

    mouseOut() {
        this.browser.findElement(webdriver.By.id("content")).then((el) => {
            this.browser.actions().mouseMove(el, { x: -1000, y: -1000 }).perform();
        }).then(() => {
            this.browser.sleep(1000);
        }).then(() => {
            this.browser.findElement(webdriver.By.css("div.modal-footer p")).click();
        });
    }

    fileUpload(path) {
        this.browser.findElement(webdriver.By.id("file-upload")).then((el) => {
            return el.sendKeys(path);
        }).then(() => {
            return this.browser.findElement(webdriver.By.id("file-submit")).click();
        }).then(() => {
            return this.browser.findElement(webdriver.By.id("uploaded-files")).getText();
        }).then((text) => {
            console.log(text + " uploaded");
        })
    }

    scrollAndCheckMenu(height) {
        const menuHeight = 37.39;
        this.browser.executeScript(`window.scrollTo(0,${height});`).then(() => {
            return this.browser.findElement(webdriver.By.id("menu")).getAttribute("style");
        }).then((style) => {
            if (style === `top: ${height - menuHeight}px;`) console.log("Menu bar has moved");
        })
    }
}

module.exports = Util;




