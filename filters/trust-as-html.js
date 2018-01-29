(function () {
	angular.module('app')
		.filter('trustAsHtml', ['$sce', trustAsHtml]);

	function trustAsHtml($sce)	{
		return function (string) {
			return $sce.trustAsHtml(string);
		};
	}
}());
