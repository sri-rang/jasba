#!/usr/bin/env node
(function () {
    "use strict";

    var fs = require("fs"),
        logger = require("./logger"),
        jasba_json_path = process.cwd() + "/jasba.json",
        flags = process.argv.slice(2);

    if (!fs.existsSync(jasba_json_path)) {
        logger.error("Error: Cannot find `jasba.json` at `" + process.cwd() + "`");
        process.kill(process.pid, "SIGINT");
    }

    var watchr = require("watchr"),
        builders = {
            javascript: require("./build_javascript"),
            typescript: require("./build_typescript"),
            less: require("./build_less"),
            stylus: require("./build_stylus"),
            copy: require("./build_copy")
        },
        build_config = require(jasba_json_path),
        should_watch = flags.indexOf("--watch") > -1;

    start();

    function start() {
        logger.h1("\n  jasba");
        Object.keys(build_config).forEach(function (key) { perform_build(key, build_config[key]); });
        logger.h1("  ok\n");
    }

    function perform_build(name, config) {
        if (!builders.hasOwnProperty(config.type)) {
            logger.error("Unknown build type: " + config.type);
            process.kill(process.pid, "SIGINT");
        }
        builders[config.type].build(name, config);
        if (should_watch && !config.being_watched && config.watch_folders) {
            watch(config.watch_folders, function () { perform_build(name, config); });
            config.being_watched = true;
        }
    }

    function watch(folders, build_fn) {
        watchr.watch({
            ignoreHiddenFiles: true,
            ignoreCommonPatterns: true,
            ignoreCustomPatterns: /\.*___jb_bak___/i,
            paths: folders,
            listeners: {
                change: function (change_type, file_path) { build_fn(change_type, file_path); }
            },
            next: function () {}
        });
    }

})();
