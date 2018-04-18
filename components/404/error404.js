angular.module('app').directive('error404', ['page', '$translate', loadingCardDirective]);

function loadingCardDirective(page, $translate) {
	let controller = ['$scope', function ($scope) {
		page.title = $scope.title || $translate.instant('DEFAULT404_ERROR_TITLE');
	}];
	return {
		scope: {
			title: '@',
			message: '@',
		},
		controller: controller,
		replace: true,
		restrict: 'E',
		templateUrl: 'components/404/error404.view.html'
	};
}