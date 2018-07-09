(function () {
	angular.module('app')
		.filter('toMB', [toMb]);

	function toMb()	{
		return function (size) {
			return (size / 1000000).toFixed(2) || 0;
		};
	}
}());
