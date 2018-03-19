(function () {
	angular.module('app')
		.controller('MainCtrl', ['$scope', 'Page', MainCtrl]);

	function MainCtrl($scope, Page) {
		$scope.Page = Page;
	}
}());