angular.module('app').directive('loadingCard', [loadingCardDirective]);

function loadingCardDirective() {
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'components/loading-card/loading-card.view.html'
	};
}
