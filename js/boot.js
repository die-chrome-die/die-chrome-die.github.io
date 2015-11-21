var bootState = {
    preload: function() {

    },

    create: function() {
        game.stage.backgroundColor = '#f7f7f7';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');
    }
}
