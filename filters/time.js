(function () {
	angular.module('app')
		.filter('time', [time]);

	function time()	{
		return function (seconds, showMs) {
			if (typeof showMs === undefined) {
				showMs = true;
			}
			// Gotten from
			// https://gist.github.com/edwinwebb/1376880
			var ms = Math.floor((seconds * 1000) % 1000);
			var s = Math.floor(seconds % 60);
			var m = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
			
			var strFormat = 'MM:SS.XX';
			
			if (!showMs) {
				strFormat = 'MM:SS';
			}
			
			if (s < 10) s = '0' + s;
			if (m < 10) m = '0' + m;
			if (ms < 100) ms = '0' + ms;

			strFormat = strFormat.replace(/MM/, m);
			strFormat = strFormat.replace(/SS/, s);
			strFormat = strFormat.replace(/XX/, ms.toString().slice(0, 2));

			return strFormat;
		};
	}
}());
