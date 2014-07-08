require([
    'brejep/fillsnfixes',
    'brejep/keypoll',
    'game/oceanworldclicker'
], function(Fixes, KeyPoll, OceanworldClicker) {
        'use strict';

        function OceanworldClickerApp() {
            // Game initialisation
            this.initialise = function() {
                // some polyfills and additions to base javascript classes
                Fixes.initialise();

                var gamewrapper = document.getElementById('game-wrapper');

                // init keyboard poll
                KeyPoll.initialise(window);


                this.oceanworldclicker = new OceanworldClicker(gamewrapper);
                this.oceanworldclicker.start();
            };

        }

        // start!
        var app = new OceanworldClickerApp();
        window.app = app;
        app.initialise();
    }
);
