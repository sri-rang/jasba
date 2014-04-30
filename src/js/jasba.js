#!/usr/bin/env node
(function () {
    "use strict";

    var watchr = require("watchr"),
        logger = require("./logger"),
        builders = {
            javascript: require("./build_javascript"),
            typescript: require("./build_typescript"),
            less      : require("./build_less"),
            stylus    : require("./build_stylus"),
            copy      : require("./build_copy")
        },
        build_config = require(process.cwd() + "/build_config.json");

    // main
    logger.faded("#");
    for (var name in build_config) if (build_config.hasOwnProperty(name)) perform_build(name, build_config[name]);

    function perform_build(name, config) {
        if (!builders.hasOwnProperty(config.type)) throw new Error("Unknown build type: " + config.type);
        if (config.skip) logger.strong("\nskipping " + name);
        else {
            builders[config.type].build(name, config);
            if (!config.being_watched && config.watch_folders) {
                watch(config.watch_folders, function () {
                    logger.strong("\n  ~~ rebuild ~~");
                    perform_build(name, config);
                });
                config.being_watched = true;
            }
        }
    }

    function watch(folders, build_fn) {
        watchr.watch({
            ignoreHiddenFiles   : true,
            ignoreCommonPatterns: true,
            ignoreCustomPatterns: /\.*___jb_bak___/i,
            paths               : folders,
            listeners           : {
                change: function (change_type, file_path) { build_fn(change_type, file_path); }
            },
            next                : function () {}
        });
    }

})();
