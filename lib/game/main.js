ig.module(
	'game.main'
)
.requires(
	'game.screens.mainMenuScreen'
//    ,
//    'impact.debug.debug'
)
.defines(function(){
    ig.main( '#canvas', MainMenuScreen, 60, 720, 480, 1.5 );
});
