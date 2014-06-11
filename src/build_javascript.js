(function () {
    "use strict";

    var fs = require("fs"),
        fs_extra = require("fs-extra"),
        uglify_js = require("uglify-js");

    var logger = require("./logger");

    exports.build = function (name, config) {
        var compile_files = config.sources,
            target = process.cwd() + "/" + config.target,
            code, ugly;
        if (config.debug) {
            code = compile_files.reduce(function (acc, path) { return acc + fs.readFileSync(path, "utf-8"); }, "");
        }
        else {
            ugly = uglify_js.minify(compile_files, {});
            code = ugly.code;
        }
        fs_extra.outputFileSync(target, code, "utf-8");
        logger.info("  √ " + name);
    };

})();
