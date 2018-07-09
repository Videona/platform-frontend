(function () {
	angular.module('app')
		.filter('commaSeparated', ['$translate', commaSeparated]);

	function commaSeparated($translate)	{
		return function (commaStr, empty, translate) {
			if (!commaStr) {
				return empty || '';
			}

			var commaStrUpdated = '';
			var commaArray = commaStr.split(',');

			for (var i = 0; i < commaArray.length; i++) {
				if (i > 0) {
					commaStrUpdated += ', ';
				}

				var str = commaArray[i].trim();
				if (translate) {
					str = $translate.instant(translate + str);
				}

				commaStrUpdated += str;
			}
			
			if (commaArray.length == 0) {
				commaStrUpdated = empty || '';
			}

			return commaStrUpdated;
		};

	}
}());
