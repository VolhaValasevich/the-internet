const Util = require("./util.js");

class Steps {

    constructor() {
        this.util = new Util();
    }

    catchError(err) {
        console.log(err);
        this.util.closeBrowser();
    }

    BasicAuthorization() {
        this.util.authorize("http://the-internet.herokuapp.com/basic_auth", "admin", "admin").then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }

    FindBrokenImages() {
        this.util.openUrl("http://the-internet.herokuapp.com/broken_images").then(() => {
            return this.util.findBrokenImages();
        }).then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }

    DragAndDrop() {
        this.util.openUrl("http://the-internet.herokuapp.com/drag_and_drop").then(() => {
            return this.util.dragAndDrop();
        }).then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }

    ExitIntent() {
        this.util.openUrl("http://the-internet.herokuapp.com/exit_intent").then(() => {
            return this.util.mouseOut();
        }).then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }

    FileUpload() {
        this.util.openUrl("http://the-internet.herokuapp.com/upload").then(() => {
            return this.util.fileUpload("D:\\Downloads\\test.txt");
        }).then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }

    FloatingMenu() {
        this.util.openUrl("http://the-internet.herokuapp.com/floating_menu").then(() => {
            return this.util.scrollAndCheckMenu(2000);
        }).then(() => {
            this.util.closeBrowser();
        }).catch((err) => { catchError(err) })
    }
}

module.exports = Steps;
