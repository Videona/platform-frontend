angular.module('app').directive('loading', [loadingDirective]);

function loadingDirective() {
	return {
        restrict: 'E',
        templateUrl: 'components/loading/loading.view.html'
    };
}
