ig.module(
    'game.screens.gameScreen'
)

.requires(
    'impact.game',
    'impact.font',
    'plugins.gui',
    'game.levels.arena',
    'plugins.astar-for-entities'
)

.defines(function() {
    GameScreen = ig.Game.extend({
        player: null,
        font: new ig.Font('media/big-font.png'),

        gravity: 0,

        init: function() {
            this.bindKeys();
            this.loadLevel(LevelArena);
        },

        bindKeys: function() {
            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.D, 'right');
            ig.input.bind(ig.KEY.W, 'up');
            ig.input.bind(ig.KEY.S, 'down');

            ig.input.bind(ig.KEY.LEFT_ARROW, 'shootLeft');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'shootRight');
            ig.input.bind(ig.KEY.UP_ARROW, 'shootUp');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'shootDown');
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();
            if (ig.gui.show) {
                ig.gui.draw();
            }
        },

        loadLevel: function(data) {
            this.parent(data);
        }
    })
});