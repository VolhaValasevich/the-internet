const Util = require("./util.js");

class Steps {

    constructor() {
        this.util = new Util();
    }

    BasicAuthorization() {
        this.util.authorize("http://the-internet.herokuapp.com/basic_auth", "admin", "admin").then(() => {
            this.util.closeBrowser();
        })
    }

    FindBrokenImages() {
        this.util.openUrl("http://the-internet.herokuapp.com/broken_images").then(() => {
            return this.util.findBrokenImages();
        }).then(() => {
            this.util.closeBrowser();
        })
    }

    DragAndDrop() {
        this.util.openUrl("http://the-internet.herokuapp.com/drag_and_drop").then(() => {
            return this.util.dragAndDrop();
        }).then(() => {
            this.util.closeBrowser();
        })
    }

    ExitIntent() {
        this.util.openUrl("http://google.com").then(() => {
            return this.util.mouseOut();
        })
    }
}

module.exports = Steps;
