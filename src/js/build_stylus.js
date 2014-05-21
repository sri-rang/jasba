(function () {
    "use strict";

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.strong("\n" + name, config.type);
        throw new Error(config.type + " not implemented");
    };
    
})();
