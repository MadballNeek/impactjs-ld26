ig.module(
    'game.screens.gameScreen'
)

.requires(
    'impact.game',
    'game.entities.enemy',
    'plugins.astar-for-entities',
    'impact.font',
    'plugins.gui',
    'game.system.bulletManager',
    'game.levels.arena'
)

.defines(function() {
    GameScreen = ig.Game.extend({
        player: null,
        font: new ig.Font('media/big-font.png'),

        gravity: 0,

        bulletManager: null,

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

        keepPlayerWithinScreen: function() {
            if (this.player) {
                // Top bounds
                if (this.player.pos.y < this.screen.y) {
                    this.player.pos.y = this.screen.y;
                }
                // Bottom bounds
                if (this.player.pos.y > ig.system.height - this.collisionMap.tilesize) {
                    this.player.pos.y = ig.system.height - this.collisionMap.tilesize;
                }
                // Left bounds
                if (this.player.pos.x < this.screen.x) {
                    this.player.pos.x = this.screen.x;
                }
                // Right bounds
                if (this.player.pos.x > ig.system.width - this.collisionMap.tilesize) {
                    this.player.pos.x = ig.system.width - this.collisionMap.tilesize;
                }
            }
        },

        spawnEnemies: function() {
            this.spawnEntity('EntityEnemy', 602, 150, {});
            this.spawnEntity('EntityEnemy', 602, 180, {});
            this.spawnEntity('EntityEnemy', 602, 300, {});
            this.spawnEntity('EntityEnemy', 602, 330, {});
        },

        update: function() {
            this.parent();
            if (this.player) {
                this.keepPlayerWithinScreen();
            }
        },

        draw: function() {

            this.parent();
        },

        loadLevel: function(data) {
            this.parent(data);
            this.spawnEnemies();
//            this.bulletManager = new BulletManager();
        }
    })
});