angular.module('app').directive('bottombar', [bottombarDirective]);

function bottombarDirective() {
	return {
        restrict: 'E',
        templateUrl: 'components/bottombar/bottombar.view.html'
    };
}
