(function () {
	angular.module('app')
		.filter('localeDate', ['$translate', localeDate]);

	function localeDate($translate)	{
		return function (date) {

			var d = new Date(date);
			var options = { year: 'numeric', month: 'long', day: 'numeric' };

			var lang = $translate.use();
			var locale = 'es-ES';

			switch(lang) {
				case 'es_es': 
					var locale = 'es-ES';
					break;

				case 'en_us':
					var locale = 'en-US';
					break; 
			}

			var str = d.toLocaleDateString(locale, options);

			return str;
		};
	}
}());
