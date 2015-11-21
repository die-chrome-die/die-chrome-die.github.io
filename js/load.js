var loadState = {

     preload: function() {
        game.load.image('bullet', 'assets/Pixel.svg');
        game.load.image('chrome', 'assets/Chrome.svg');
        game.load.image('bg', 'assets/Clouds2.png');
        game.load.image('reset', 'assets/Play_Again.png');
     },

     create: function() {
        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            game.scale.minWidth = 250;
            game.scale.minHeight = 170;
            game.scale.maxWidth = 1000;
            game.scale.maxHeight = 680;

            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            game.scale.setScreenSize(true)
        }

        game.state.start('game');
     }
}
