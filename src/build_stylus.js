(function () {
    "use strict";

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.info("\n  " + name);
        logger.error(config.type + " not implemented");
        process.kill(process.pid, "SIGINT");
    };
    
})();
