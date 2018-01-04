// English
angular.module('app')
	.config(function ($translateProvider) {
		$translateProvider.translations('en_us', 
			{
				HELLO: 'Hello',
				WORLD: 'world'
			}
		);
	});