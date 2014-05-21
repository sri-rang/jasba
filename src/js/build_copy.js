(function () {
    "use strict";

    var fs_extra = require("fs-extra");

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.strong("\n" + name, config.type);
        if (config.cleanup_folders) config.cleanup_folders.forEach(function (path) {fs_extra.deleteSync(path);});
        config.files.forEach(function (file) { fs_extra.copySync(file.src, file.dest); });
        logger.faded("done");
    };

})();
