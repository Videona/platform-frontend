angular.module('app').directive('mixpanel', ['mixpanelApiKey', mixpanelInitDirective]);

function mixpanelInitDirective(mixpanelApiKey) {
	let controller = ['$scope', 'mixpanelApiKey', function ($scope, mixpanelApiKey) {
		$scope.mixpanelApiKey = mixpanelApiKey;
	}];
	return {
		scope: {
			title: '@',
			message: '@',
		},
		controller: controller,
		replace: true,
		restrict: 'E',
		link: function link(scope, element) {
			mixpanel.init( mixpanelApiKey , { track_pageview: false });
		}
	};
}
