function spaceoutText(text) {
    var r = '';

    for (var c = 0; c < text.length; c++) {
        if (text.charAt(c) === ' ') {
            r += '   ';
        } else {
            r += text.charAt(c) + ' ';
        }
    }

    return r.substr(0, r.length - 1);
}

function formatScore(score, c) {
    var l = score.toString().length;
    var r = '';

    for (var i = 0; i < c - l; i++) {
        r += '0';
    }

    return r + score;
}

var highScore = {
    get: function () {
        var hs = localStorage.getItem('highScore');

        if (hs !== null) {
            hs = parseInt(hs, 10);
        } else {
            hs = 0;
        }

        return hs;
    },

    set: function (score) {
        localStorage.setItem('highScore', score);
    }
};

var gameWidth = 600;
var gameHeight = 150;
var play = false;
var scoreText;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');

game.global = {
    score : 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('game', gameState);

game.state.start('boot');

var startBtn = document.getElementById('run');

startBtn.addEventListener('click', function () {
    playerFace = 'Angry_Face';
    play = true;

    startBtn.style.display = 'none';

    var hs = formatScore(highScore.get(), 5);
    scoreText = game.add.text(420, 0, spaceoutText('HI  ' + hs + '   00000'), { font: "20px ArcadeClassic", fill: '#737373'} );
});
