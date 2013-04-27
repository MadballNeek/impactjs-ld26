ig.module(
    'game.entities.bullet'
)

.requires(
    'game.system.eventChain',
    'impact.entity'
)

.defines(function() {
    EntityBullet = ig.Entity.extend({
        name: 'bullet',
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,

        animSheet: new ig.AnimationSheet('media/bullet.png', 8, 8),
        size: {x: 6, y: 7},
        offset: {x: 2, y: 1},
        flip: false,

        maxVel: {x: 500, y: 500},
        friction: {x: 0, y: 0},
        accelGround: 500,
        accelAir: 500000,
        direction: {x: 0, y: 0},
        whoFired: null,
        isActive: true,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.whoFired = settings['whoFired'];
            this.direction.x = settings['direction'].x;
            this.direction.y = settings['direction'].y;
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
        },

        move: function() {
            var accel = this.accelAir;
            this.accel.x = this.direction.x * accel;
            this.accel.y = this.direction.y * accel;
        },

        killOutOfScreen: function() {
            if (this.pos.y < ig.game.screen.y - ig.game.collisionMap.tilesize ||
                this.pos.y > ig.system.height ||
                this.pos.x < ig.game.screen.x ||
                this.pos.x > ig.system.width - ig.game.collisionMap.tilesize) {
//                ig.game.bulletManager.storeBullet(this);
                this.kill();
            }
        },

        inactivate: function() {
            this.isActive = false;
            this.checkAgainst = ig.Entity.TYPE.NONE;
            this.collides = ig.Entity.COLLIDES.NONE;
        },

        activate: function() {
            this.isActive = true;
            this.checkAgainst = ig.Entity.TYPE.BOTH;
            this.vel.x = 0;
            this.vel.y = 0;
        },

        update: function() {
            if (this.isActive) {
                this.move();
                this.killOutOfScreen();
                this.parent();
            }
        },

        draw: function() {
            if (this.isActive) {
                this.parent();
            }
        },

        check: function(other) {
            // Don't kill the entity that spawned the bullet!
            if (other.name != this.whoFired.name) {
//                ig.game.bulletManager.storeBullet(this);
                this.kill();
                other.receiveDamage(10);
            }
        },

        handleMovementTrace: function(res) {
            // Check for collision against walls and other tiles in the collision map.
            if (res.collision.y || res.collision.x) {
//                ig.game.bulletManager.storeBullet(this);
                this.kill();
            }
            this.parent(res);
        }
    })
});