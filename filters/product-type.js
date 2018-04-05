(function () {
	angular.module('app')
		.filter('productType', ['productType', productType]);

	function productType(productType)	{
		return function (typesStr) {
			if (!typesStr) {
				return '-';
			}

			var types = typesStr.split(',');
			var typesLang = '';

			for (var i = 0; i < types.length; i++) {
				var product = find(types[i]);
				if (product && product.name) {
					typesLang += (i == 0) ? product.name : ', ' + product.name;
				}
			}

			return typesLang || '-';
		};

		function find(id) {
			for (var i = productType.length - 1; i >= 0; i--) {
				if (productType[i].id === id.trim()) {
					return productType[i];
				}
			}

			return null;
		}
	}
}());
