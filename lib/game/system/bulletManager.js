ig.module(
    'game.system.bulletManager'
)

.requires(
    'impact.entity',
    'game.entities.bullet'
)

.defines(function() {
    BulletManager = ig.Class.extend({
        bullets: [],

        init: function() {
            this.bullets = new Array(50);
            var settings = [];
            for (var i = 0; i < this.bullets.length; ++i) {
                settings['whoFired'] = this;
                settings['direction'] = {x: 0, y: 0};
                this.bullets[i] = ig.game.spawnEntity(EntityBullet, 0, 0, settings);
                // Initially, set all bullets to not be active.
                this.bullets[i].isActive = false;
            }
        },

        spawnBullet: function(x, y, settings) {
            var bullet;
            if (this.bullets.length > 0) {
                bullet = this.bullets.pop();
                bullet.init(x, y, settings);
            } else {
                bullet = ig.game.spawnEntity(EntityBullet, x, y, settings);
            }

            return bullet;
        },

        storeBullet: function(bullet) {
            if (bullet) {
                bullet.inactivate();
                this.bullets.push(bullet);
            }
        }
    });
});