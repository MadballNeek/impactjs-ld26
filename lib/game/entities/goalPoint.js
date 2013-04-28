ig.module(
    'game.entities.goalPoint'
)

.requires(
    'game.system.eventChain',
    'impact.entity'
)

.defines(function() {
    EntityGoalPoint = ig.Entity.extend({
        name: 'goal',
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/goalPoint.png', 16, 16),
        size: {x: 12, y: 15},
        offset: {x: 2, y: 1},
        flip: false,

        maxVel: {x: 0, y: 0},
        friction: {x: 0, y: 0},
        accelGround: 0,
        accelAir: 0,
        direction: {x: 0, y: 0},
        beingCarried: null,
        decayEventChain: null,

        captureFx: new ig.Sound('media/soundfx/capture.*'),

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
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();
        },

        check: function(other) {
            if (other.name == 'player') {
                if (other.carryingFlag) {
                    other.scoreAPoint();
                    this.captureFx.play();
                }
            } else {
                this.beingCarried = false;
            }
        },

        handleMovementTrace: function(res) {
            this.parent(res);
        }
    })
});