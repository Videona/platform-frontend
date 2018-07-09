angular.module('app')
	.directive('stars', [StarsDirective]);

function StarsDirective() {
	return {
		templateUrl: 'components/stars/stars.view.html',
		scope: {
			value: '@'
		}
	};
}