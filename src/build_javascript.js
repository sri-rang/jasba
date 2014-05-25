(function () {
    "use strict";

    var fs_extra = require("fs-extra"),
        uglify_js = require("uglify-js");

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.info("\n  " + name);
        var compile_files = config.sources,
            target = process.cwd() + "/" + config.target,
            code, ugly;
        ugly = uglify_js.minify(compile_files, {});
        code = ugly.code;
        fs_extra.outputFileSync(target, code, "utf-8");
        logger.info("  ✔");
    };

})();
