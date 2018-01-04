// English
angular.module('app')
	.config(function ($translateProvider) {
		$translateProvider.translations('es_es', 
			{
				HELLO: 'Hola',
				WORLD: 'mundo'
			}
		);
	});