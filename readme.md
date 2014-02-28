# build.js

simple build server that compiles javascript and less source files.

it runs a server that watches source folders and triggers the build on change.

has a simple json based configuration, example below:

    {
        "compile less"    : {
            "type"         : "less",
            "sources"      : [
                "src/less/file_1.less",
                "src/less/file_2.less",
            ],
            "minify"       : true,
            "target"       : "target/css/styles.css",
            "watch_folders": ["src/less/"]
        },
        "compile js"      : {
            "type"         : "uglify",
            "sources"      : [
                "libs/jquery.js",
                "libs/underscore.js",
                "src/js/file_1.js",
                "src/js/file_2.js"
            ],
            "minify"       : false,
            "target"       : "target/js/scripts.js",
            "watch_folders": ["src/js/"]
        },
        "copy files": {
            "type"         : "copy",
            "files"        : [
                {
                    "src" : "target/css/styles.css",
                    "dest": "/some/other/location/styles.css"
                }
            ],
            "watch_folders": ["target/"]
        }
    }

the config file must be called **build_config.json**.

it must live in your project's root folder.

### why did you create this?

i wanted something simple and minimal.

### will you support it?

yes, as long as its being used.

and i expect to be using it for a long time.

it's also being used by teams at my workplace, so i guess i have to.
