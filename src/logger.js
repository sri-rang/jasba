(function () {
    "use strict";

    var colors = require("colors");

    colors.setTheme({
        debug: "white",
        error: "red",
        info: "grey",
        warn: "yellow"
    });

    exports.debug = function () { console.log(Array.prototype.slice.call(arguments).join(", ").debug); };
    exports.error = function () { console.log("\n  ✘ " + Array.prototype.slice.call(arguments).join(", ").error.bold + "\n"); };
    exports.info = function () { console.log(Array.prototype.slice.call(arguments).join(", ").info); };
    exports.warn = function () { console.log(Array.prototype.slice.call(arguments).join(", ").warn); };
    exports.h1 = function () { console.log(Array.prototype.slice.call(arguments).join(", ").grey.bold); };

})();
