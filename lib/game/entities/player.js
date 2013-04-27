ig.module(
    'game.entities.player'
)

.requires(
    'game.system.eventChain'
)

.defines(function() {
    EntityPlayer = ig.Entity.extend({
        name: 'player',
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.A,
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

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
            this.isDead = false;
            this.deathEventChain = EventChain(this)
                .then(function() {
                    this.isDead = true;
                    this.kill();
                })
                .repeat();
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

        stopMovingPlayer: function () {
            this.accel.x = 0;
            this.accel.y = 0;
        },

        update: function() {
            this.movePlayer();
            if (this.health <= 0) {
                this.deathEventChain();
            }
            this.parent();
        },

        check: function(other) {
            if (other.name == 'enemy') {
                //this.health -= 10;
            }
       }
    });
});