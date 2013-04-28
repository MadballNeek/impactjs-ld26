ig.module(
    'game.entities.enemy'
)

.requires(
    'impact.entity',
    'game.system.eventChain'
)

.defines(function() {
    EntityEnemy = ig.Entity.extend({
        name: 'enemy',
        collides: ig.Entity.COLLIDES.ACTIVE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,

        animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
        size: {x: 12, y: 15},
        offset: {x: 2, y: 1},
        flip: false,

        maxVel: {x: 200, y: 200},
        friction: {x: 600, y: 600},
        accelGround: 400,
        accelAir: 400,

        health: 100,
        isDead: false,

        pathTimer: null,
        shootTimer: null,

        pathRefreshTime: 0.2,
        pathFindingSpeed: 200,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
            this.isDead = false;
            this.shootTimer = new ig.Timer(0.2);
            this.pathRefreshTime = Math.floor(Math.random() * (3 - 0.5) + 0.5);
            this.pathTimer = new ig.Timer(this.pathRefreshTime);
            this.zIndex = -1;
        },

        fireBullet: function(targetX, targetY) {
            var settings = [];
            settings['whoFired'] = this;
            settings['direction'] = {x: targetX, y: targetY};
            ig.game.spawnEntity(EntityBullet, this.pos.x + 5, this.pos.y + 5, settings);
        },

        aStarPathFinding: function() {
            var targetX;
            var targetY;
            if (this.pathTimer.delta() > 0 && ig.game.player) {
                // If the player isn't dead, he's the target.
                // Else, pick a random (x, y) coordinate on the screen to roam too.
                targetX = !ig.game.player._killed ? ig.game.player.pos.x : Math.floor((Math.random() * ig.system.width) + 1);
                targetY = !ig.game.player._killed ? ig.game.player.pos.y : Math.floor((Math.random() * ig.system.height) + 1);
                this.getPath(targetX, targetY, false, [], []);
                this.pathTimer.reset();
            }
            this.followPath(this.pathFindingSpeed, true);
        },

        aimForPlayer: function() {
            if (ig.game.player && this.distanceTo(ig.game.player) < 150) {
                if (this.shootTimer.delta() >= 0) {
                    var x = 0;
                    var y = 0;
                    if (this.vel.x < 0) {
                        x = -1;
                    } else if (this.vel.x > 0) {
                        x = 1;
                    } else if (this.vel.y < 0) {
                        y = -1;
                    } else if (this.vel.y > 0) {
                        y = 1;
                    }
                    this.fireBullet(x, y);
                    this.shootTimer.reset();
                }
            }
        },

        update: function() {
            this.aStarPathFinding();
            this.aimForPlayer();
            this.parent();
        },

        check: function(other) {
            if (other.name == 'bullet') {
                if (other.whoFired.name == 'player') {
                    console.log(this.health);
                    this.health -= 10;
                }
            }
        },

        kill: function() {
            ig.game.enemyRespawnRequest++;
            this.parent();
        }
    });
});