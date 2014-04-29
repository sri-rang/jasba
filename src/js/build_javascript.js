(function () {
    "use strict";

    var fs = require("fs"),
        fs_extra = require("fs-extra"),
        uglify_js = require("uglify-js");

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.strong("\n" + name, config.type);
        var compile_files = config.sources,
            target = process.cwd() + "/" + config.target,
            code = "", ugly;
        compile_files.forEach(function (file) { logger.faded("compiling " + file); });
        if (config.minify) {
            ugly = uglify_js.minify(compile_files, {});
            code = ugly.code;
        }
        else compile_files.forEach(function (path) {code += "\n // --- " + path + " \n\n" + fs.readFileSync(path, "utf-8");});
        fs_extra.outputFileSync(target, code, "utf-8");
        logger.faded("generated " + target);
    };

})();
