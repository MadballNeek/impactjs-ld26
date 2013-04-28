ig.module(
    'game.screens.gameScreen'
)

.requires(
    'impact.game',
    'game.entities.enemy',
    'game.entities.flag',
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
        score: 0,

        bulletManager: null,
        respawnTimer: null,
        enemyRespawnRequest: 0,
        playerRespawnRequest: false,

        init: function() {
            if (ig.ua.mobile) {
                ig.Sound.enabled = false;
            }
            this.bindKeys();
            this.respawnTimer = new ig.Timer(3);
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
                // Top bounds - Adding 20, in order to pad the top bounds a bit,
                // is necessary due to a A* plugin bug, which I don't have time right now to debug.
                // Ludum Dare 26!!
                if (this.player.pos.y < this.screen.y + 20) {
                    this.player.pos.y = this.screen.y + 20;
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
            this.spawnEntity('EntityEnemy', 602, 150);
            this.spawnEntity('EntityEnemy', 602, 180);
            this.spawnEntity('EntityEnemy', 602, 300);
            this.spawnEntity('EntityEnemy', 602, 330);
        },

        respawnEnemy: function() {
            this.spawnEntity('EntityEnemy', 602, 180);
        },

        respawnPlayer: function() {
            this.player = this.spawnEntity('EntityPlayer', 98, 241);
        },

        update: function() {
            this.parent();
            if (this.player) {
                this.keepPlayerWithinScreen();
            }
            if (this.respawnTimer.delta() >= 0) {
                if (this.enemyRespawnRequest > 0) {
                    this.respawnEnemy();
                    this.enemyRespawnRequest > 0 ? this.enemyRespawnRequest-- : 0;
                }
                if (this.playerRespawnRequest) {
                    this.respawnPlayer();
                    this.playerRespawnRequest = false;
                }
                this.respawnTimer.reset();
            }
        },

        draw: function() {
            this.parent();
            this.font.draw("Health: " + this.player.health + "\nScore: " + ig.game.score, 20, 13);
        },

        loadLevel: function(data) {
            this.parent(data);
            this.spawnEnemies();
        }
    })
});