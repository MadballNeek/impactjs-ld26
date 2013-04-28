ig.module(
    'game.entities.flag'
)

.requires(
    'game.system.eventChain',
    'impact.entity'
)

.defines(function() {
    EntityFlag = ig.Entity.extend({
        name: 'flag',
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/redFlag.png', 8, 8),
        size: {x: 6, y: 7},
        offset: {x: 2, y: 1},
        flip: false,

        maxVel: {x: 0, y: 0},
        friction: {x: 0, y: 0},
        accelGround: 0,
        accelAir: 0,
        direction: {x: 0, y: 0},
        beingCarried: null,
        decayEventChain: null,
        playSound: true,

        pickupFx: new ig.Sound('media/soundfx/pickup.*'),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
            this.decayEventChain = EventChain(this)
                .wait(5)
                .then(function() {
                    this.resetPosition();
                })
                .repeat();
            this.zIndex = 1;
        },

        move: function() {
            if (this.beingCarried) {
                this.pos.x = ig.game.player.pos.x;
                this.pos.y = ig.game.player.pos.y;
            }
        },

        resetPosition: function() {
            this.pos.x = 626;
            this.pos.y = 245;
            this.beingCarried = false;
        },

        killOutOfScreen: function() {
            if (this.pos.y < ig.game.screen.y - ig.game.collisionMap.tilesize ||
                this.pos.y > ig.system.height ||
                this.pos.x < ig.game.screen.x ||
                this.pos.x > ig.system.width - ig.game.collisionMap.tilesize) {
                this.resetPosition();
            }
        },

        update: function() {
            this.move();
            this.killOutOfScreen();
            if (!this.beingCarried) {
                this.decayEventChain();
            }
            this.parent();
        },

        draw: function() {
            this.parent();
        },

        check: function(other) {
            if (other.name == 'player') {
                this.beingCarried = true;
                other.carryingFlag = true;
                if (this.playSound) {
                    this.pickupFx.play();
                    this.playSound = false;
                }
            } else if (!this.beingCarried && other.name == 'enemy') {
                this.beingCarried = false;
                this.playSound = true;
                this.resetPosition();
            } else {
                this.beingCarried = false;
                this.playSound = true;
            }
        },

        handleMovementTrace: function(res) {
            this.parent(res);
        }
    })
});