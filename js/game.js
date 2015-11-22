var upKey;
var downKey;
var leftKey;
var rightKey;

var playerSpeed = 200;
var bulletSpeed = 800;
var chromeSpeed = 150;
var playerFace = 'Default_Face';

var bgtile;

var spawnInterval = 1500;

var gameState = {

    preload: function () {
        game.load.atlasJSONHash('face', 'assets/Paper_Face_Sprite.png', 'assets/Paper_Face_Sprite.json');
    },

    create: function() {
        bgtile = game.add.tileSprite(0, 0, 600, 150, 'bg');
        bgtile.visible = false;

        this.speed = 1;
        this.play = true;

        this.chromes = game.add.group();
        this.chromes.enableBody = true;
        this.chromes.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.player = game.add.sprite(0, 50, 'face', 'Default_Face');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        var shootKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        shootKey.onDown.add(this.createBullet, this);
        shootKey.onUp.add(this.setAngryFace, this);

        this.createChrome();

        game.time.events.loop(spawnInterval, this.createChrome, this);
    },

    update: function() {
        if (play) {
            this.player.frameName = playerFace;

            game.physics.arcade.collide(this.chromes, this.bullets, this.hitChrome, null, this);
            game.physics.arcade.collide(this.chromes, this.player, this.gameOver, null, this);

            this.updatePlayer();
            this.moveChromes();
            this.moveBullets();
            this.updateScore();

            bgtile.visible = true;
            bgtile.tilePosition.x -= 1;
        }
    },

    hitChrome: function (chrome, bullet) {
        game.global.score++;

        this.removeBullet(bullet);
        this.removeChrome(chrome);
    },

    updatePlayer: function () {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (upKey.isDown) {
            this.player.body.velocity.y = -playerSpeed;
        } else if (downKey.isDown) {
            this.player.body.velocity.y = +playerSpeed;
        }

        if (leftKey.isDown) {
            this.player.body.velocity.x = -playerSpeed;
        } else if (rightKey.isDown) {
            this.player.body.velocity.x = +playerSpeed;
        }
    },

    moveChromes: function () {
        this.chromes.forEach(function (chrome) {
            // Move chrome
            chrome.body.velocity.x = 0;
            chrome.body.velocity.y = 0;

            chrome.body.velocity.x = -chromeSpeed;

            // Rotate chrome
            chrome.body.rotation += 5;
        });
    },

    createChrome: function () {
        if (play) {
            var newY = game.world.randomY;

            var chrome = this.chromes.create(gameWidth, newY >= gameHeight ? gameHeight - 40 : newY, 'chrome');
            chrome.anchor.setTo(0.5, 0.5);
            chrome.checkWorldBounds = true;
            chrome.events.onOutOfBounds.add(this.removeChrome, this);
        }
    },

    moveBullets: function () {
        this.bullets.forEach(function (bullet) {
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = 0;

            bullet.body.velocity.x = bulletSpeed;
        });
    },

    createBullet: function () {
        var bullet = this.bullets.create(this.player.x + 20, this.player.y + 30, 'bullet');

        bullet.checkWorldBounds = true;
        bullet.events.onOutOfBounds.add(this.removeBullet, this);

        playerFace = 'Shoot_Face';
    },

    setAngryFace: function () {
        playerFace = 'Angry_Face';
    },

    updateScore: function () {
        var score = formatScore(game.global.score, 5);
        var highScore = formatScore(0, 5);

        scoreText.setText('HI  ' + highScore + '   ' + score);
    },

    removeBullet: function (bullet) {
        bullet.kill();
    },

    removeChrome: function (chrome) {
        chrome.kill();
    },

    gameOver: function () {
        this.player.frameName = 'Dead_Face';
        play = false;

        this.chromes.forEach(function (chrome) {
            chrome.body.moves = false;
        });

        this.player.body.moves = false;

        game.time.events.stop();

        this.showEndScreen();
    },

    showEndScreen: function () {
        endText = game.add.text(game.world.centerX, game.world.centerY - 30, spaceoutText('G a m e  O v e r'), { font: "20px ArcadeClassic"} );
        endText.anchor.x = 0.5;

        this.playAgain = game.add.sprite(game.world.centerX - 17, game.world.centerY, 'reset');
        this.playAgain.inputEnabled = true;
        this.playAgain.input.useHandCursor = true;
        this.playAgain.events.onInputDown.add(this.restartGame, this);
    },

    restartGame: function() {
        game.time.events.start();
        game.state.start('game');

        play = true;
        scoreText = game.add.text(420, 0, spaceoutText('HI  00000   00000'), { font: "20px ArcadeClassic"} );
    }

};
