(function () {
	angular.module('app')
		.filter('renderHTMLCorrectly', function ($sce)	{
			return function (stringToParse) {
				return $sce.trustAsHtml(stringToParse);
			};
		});
}());
