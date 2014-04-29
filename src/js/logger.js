(function () {
    "use strict";

    exports.faded = function () { console.log("\u001b[90m" + Array.prototype.slice.call(arguments).join(", ")); };

    exports.strong = function () { console.log("\u001b[33m" + Array.prototype.slice.call(arguments).join(", ")); };

})();
