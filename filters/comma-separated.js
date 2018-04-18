(function () {
	angular.module('app')
		.filter('commaSeparated', [commaSeparated]);

	function commaSeparated()	{
		return function (commaStr, empty) {
			if (!commaStr) {
				return empty || '';
			}

			var commaStrUpdated = '';
			var commaArray = commaStr.split(',');

			for (var i = 0; i < commaArray.length; i++) {
				if (i > 0) {
					commaStrUpdated += ', ';
				}
				commaStrUpdated += commaArray[i].trim();
			}
			
			if (commaArray.length == 0) {
				commaStrUpdated = empty || '';
			}

			return commaStrUpdated;
		};

	}
}());
