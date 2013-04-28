ig.module(
    'game.screens.mainMenuScreen'
)

.requires(
    'impact.game',
    'game.screens.gameScreen'
)

.defines(function() {
    MainMenuScreen = ig.Game.extend({
        font: new ig.Font('media/big-font.png'),
        startGame: false,

        init: function() {
            if (ig.ua.mobile) {
                ig.Sound.enabled = false;
            }
            this.bindKeys();
        },

        bindKeys: function() {
            ig.input.bind(ig.KEY.ENTER, 'enter');
        },

        update: function() {
            this.parent();
            if (ig.input.state('enter')) {
                ig.system.setGameNow(GameScreen);
            }
        },

        draw: function() {
            this.parent();
            this.font.draw("Minimally Run n Gun\n" +
                "A Ludum Dare 26 Entry", 350, 50, ig.Font.ALIGN.CENTER);
            this.font.draw("Developed by Nicholas DiMucci\n" +
                "http://mindshaftgames.appspot.com/\n\n" +
                "WASD to move. Arrow keys to shoot.\n" +
                "You've played Binding of Isaac, haven't you?\n" +
                "Capture the enemy flag 3 times to win.\n\n" +
                "Press [enter] to start!", 355, 150, ig.Font.ALIGN.CENTER);
        }
    })
});