// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ["app"],

    paths: {
        // JavaScript folders.
        brejep: "dist/ashjs-asteroids/lib/brejep", 
        game: "game",

        // Libraries
        ash: "dist/ash-js/build/ash",
        sprintf: "dist/sprintf.js/src/sprintf",
        underscore: "dist/underscore/underscore",
        lzstring: "dist/lzstring/libs/lz-string-1.3.3"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "underscore": {
            "exports": "_"
        },
        "sprintf": {
            "exports": "sprintf"
        },
        "lzstring": {
            "exports": "LZString"
        }
    }
});
