(function () {
	angular.module('app')
		.filter('trustAsResourceUrl', ['$sce', trustAsResourceUrl]);

	function trustAsResourceUrl($sce)	{
		return function (string) {
			return $sce.trustAsResourceUrl(string);
		};
	}
}());
