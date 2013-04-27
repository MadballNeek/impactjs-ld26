ig.module(
    'game.entities.player'
)

.requires(
    'game.system.eventChain',
    'impact.entity',
    'impact.font',
    'game.entities.bullet'
)

.defines(function() {
    EntityPlayer = ig.Entity.extend({
        name: 'player',
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.A,

        font: new ig.Font('media/big-font.png'),

        checkAgainst: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
        size: {x: 12, y: 15},
        offset: {x: 2, y: 1},

        flip: false,
        maxVel: {x: 200, y: 200},
        friction: {x: 600, y: 600},
        accelGround: 400,

        accelAir: 400,
        health: 100,

        isDead: false,
        deathEventChain: null,
        shootTimer: new ig.Timer(),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
            this.isDead = false;
            this.shootTimer.set(0.3);
        },


        movePlayer: function() {
            var accel = this.accelAir;

            if (ig.input.state('left')) {
                this.accel.x = -(accel);
                this.accel.y = 0;
            } else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.accel.y = 0;
            } else if (ig.input.state('up')) {
                this.accel.y = -(accel);
                this.accel.x = 0;
            } else if (ig.input.state('down')) {
                this.accel.y = accel;
                this.accel.x = 0;
            } else {
                this.stopMovingPlayer();
            }
       },

       shoot: function() {
           var settings = [];
           settings['whoFired'] = this;
           if (ig.input.released('shootLeft')) {
               settings['direction'] = {x: -1, y: 0};
               ig.game.spawnEntity(EntityBullet, this.pos.x + 5, this.pos.y + 5, settings);
//               ig.game.bulletManager.spawnBullet(this.pos.x + 5, this.pos.y + 5, settings);
           } else if (ig.input.released('shootRight')) {
               settings['direction'] = {x: 1, y: 0};
               ig.game.spawnEntity(EntityBullet, this.pos.x + 5, this.pos.y + 5, settings);
//               ig.game.bulletManager.spawnBullet(this.pos.x + 5, this.pos.y + 5, settings);
           } else if (ig.input.released('shootUp')) {
               settings['direction'] = {x: 0, y: -1};
               ig.game.spawnEntity(EntityBullet, this.pos.x + 5, this.pos.y + 5, settings);
//               ig.game.bulletManager.spawnBullet(this.pos.x + 5, this.pos.y + 5, settings);
           } else if (ig.input.released('shootDown')) {
               settings['direction'] = {x: 0, y: 1};
               ig.game.spawnEntity(EntityBullet, this.pos.x + 5, this.pos.y + 5, settings);
//               ig.game.bulletManager.spawnBullet(this.pos.x + 5, this.pos.y + 5, settings);
           }
       },

        stopMovingPlayer: function () {
            this.accel.x = 0;
            this.accel.y = 0;
        },

        update: function() {
            this.movePlayer();
            this.shoot();
            if (this.shootTimer.delta() >= 0) {
                this.shootTimer.reset();
            }
            this.parent();
        },

        draw: function() {
            this.font.draw("Health: " + this.health, 20, 13);
            this.parent();
        },

        check: function(other) {
            if (other.name == 'bullet') {
                this.health -= 10;
                console.log("player health: " + this.health);
            }
        },

        ready: function() {
            ig.game.player = this;
        }
    });
});