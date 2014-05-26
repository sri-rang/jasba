(function () {
    "use strict";

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.error(config.type + " not implemented");
        process.kill(process.pid, "SIGINT");
    };
    
})();
