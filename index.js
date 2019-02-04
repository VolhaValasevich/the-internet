const Steps = require("./steps.js");
const steps = new Steps();

steps.BasicAuthorization().then(() => {
    return steps.DragAndDrop();
}).then(() => {
    return steps.FloatingMenu();
}).then(() => {
    return steps.KeyPress();
}).then(() => {
    return steps.ExitIntent();
});