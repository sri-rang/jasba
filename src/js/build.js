(function () {
    "use strict";

    var fs = require("fs"),
        child_process = require("child_process"),
        watchr = require("watchr"),
        fs_extra = require("fs-extra"),
        uglify_js = require("uglify-js"),
        less = require("less"),
        build_config = require(process.cwd() + "/build_config.json");

    var log = {
        faded : function () { console.log("\u001b[90m" + Array.prototype.slice.call(arguments).join(", ")); },
        strong: function () { console.log("\u001b[33m" + Array.prototype.slice.call(arguments).join(", ")); }
    };

    // main
    log.faded("#");
    for (var name in build_config) if (build_config.hasOwnProperty(name)) perform_build(name, build_config[name]);

    function perform_build(name, config) {
        if (config.type === "uglify") perform_build_uglify(name, config);
        else if (config.type === "copy") perform_build_copy(name, config);
        else if (config.type === "less") perform_build_less(name, config);
        if (!config.being_watched && config.watch_folders) {
            watch(config.watch_folders, function () {
                log.strong("\n  ~~ rebuild ~~");
                perform_build(name, config);
            });
            config.being_watched = true;
        }
    }

    function perform_build_uglify(name, config) {
        log.strong("\n" + name, config.type);
        var compile_files = config.sources,
            target = process.cwd() + "/" + config.target,
            code = "", ugly;
        compile_files.forEach(function (file) { log.faded("compiling " + file); });
        if (config.minify) {
            ugly = uglify_js.minify(compile_files, {});
            code = ugly.code;
        }
        else compile_files.forEach(function (path) {code += "\n // --- " + path + " \n\n" + fs.readFileSync(path, "utf-8");});
        fs_extra.outputFileSync(target, code, "utf-8");
        log.faded("generated " + target);
    }

    function perform_build_copy(name, config) {
        log.strong("\n" + name, config.type);
        if (config.cleanup_folders) config.cleanup_folders.forEach(function (path) {fs_extra.deleteSync(path);});
        config.files.forEach(function (file) { fs_extra.copySync(file.src, file.dest); });
        log.faded("done");
    }

    function perform_build_less(name, config) {
        log.strong("\n" + name, config.type);
        var code = "",
            target = process.cwd() + "/" + config.target,
            sources = config.sources;
        sources.forEach(function (path) { code += fs.readFileSync(path, "utf-8"); });
        less.render(code, {compress: config.minify}, function (error, css) {
            if (error) throw new Error(error);
            else {
                fs_extra.outputFileSync(target, css, "utf-8"); // todo write css to target
                log.faded("generated " + target);
            }
        });
    }

    function watch(folders, build_fn) {
        watchr.watch({
            ignoreHiddenFiles   : true,
            ignoreCommonPatterns: true,
            ignoreCustomPatterns: /\.*___jb_bak___/i,
            paths               : folders,
            listeners           : {
                change: function (change_type, file_path) { build_fn(); }
            },
            next                : function () {}
        });
    }

})();
