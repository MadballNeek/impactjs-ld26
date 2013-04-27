ig.module(
	'game.main'
)
.requires(
	'game.screens.gameScreen'
    ,
    'impact.debug.debug'
)
.defines(function(){
    ig.main( '#canvas', GameScreen, 60, 720, 480, 1.5 );
});
