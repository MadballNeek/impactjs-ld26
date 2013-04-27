ig.module(
    'game.entities.baseEntity'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityBaseEntity = ig.Entity.extend({
        isActive: true,
        isVisible: true,

        update: function() {
            if (this.isActive) {
                this.parent();
            }
        },

        draw: function() {
            if (this.isVisible) {
                this.parent();
            }
        }
    });
});