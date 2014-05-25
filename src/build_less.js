(function () {
    "use strict";

    var fs = require("fs"),
        fs_extra = require("fs-extra"),
        less = require("less");

    var logger = require("./logger");

    exports.build = function (name, config) {
        logger.info("\n  " + name);
        var code = "",
            target = process.cwd() + "/" + config.target,
            sources = config.sources;
        sources.forEach(function (path) { code += fs.readFileSync(path, "utf-8"); });
        less.render(code, {compress: config.minify}, function (error, css) {
            if (error) throw new Error(error);
            else {
                fs_extra.outputFileSync(target, css, "utf-8");
                logger.info("  ✔");
            }
        });
    };

})();
