angular.module('app')
	.directive('player', ['$rootScope', playerCardDirective]);

function playerCardDirective($rootScope) {	
	return {
		scope: {
			video: '=',
			poster: '='
		},
		link: function(scope) {
			scope.onVgError = function (event) {
				console.error('Videogular error!', event);
				scope.poster = '/img/no-video.svg';
				scope.error = true;
				$rootScope.$apply();
			}
		},
		templateUrl: 'components/player/player.view.html'
	};
}