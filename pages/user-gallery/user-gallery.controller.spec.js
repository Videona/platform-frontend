describe('UserGalleryController', function () {
	beforeEach(angular.mock.module('app'));

	beforeEach(module({
		galleryServiceFactory: {
			getInstance: function (tagFilter, userId) {
				return mockedGalleryService;
			},
		},
	}));

	let controller;
	const $stateParams = { userId: 42 };

	beforeEach(angular.mock.inject(function (_$controller_, _galleryServiceFactory_, _user_) {
		const $controller = _$controller_;
		controller = $controller('UserGalleryController', { $stateParams: $stateParams });
	}));

	it('should be defined', function () {
		expect(controller).toBeDefined();
	});

});
