(function () {
	angular.module('app')
		.filter('flavour', ['flavourString', flavour]);

	function flavour(flavourString)	{
		return function (string) {
			return flavourString[string] || string;
		};
	}
}());
