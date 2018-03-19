const RESPONSE_SUCCESS = [{
	date: '2018-02-27T12:47:09.762Z',
	description: 'Description test',
	owner: '1',
	poster: 'http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.png',
	tag: 'featured',
	title: 'Title test',
	video: 'http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.mp4',
	_id: '20',
}];

describe('UserGalleryController', function () {
	beforeEach(angular.mock.module('app'));

	let mockedGalleryService = {
		getVideoList: function (cb) {
			console.log("called mocked video list......");
			setTimeout(function () {
				if (cb === true) {
					cb(true, [RESPONSE_SUCCESS]);
				} else {
					cb(false, {});
				}
			}, 100);
			return true;
		}
	};

	beforeEach(module({
		galleryServiceFactory: {
			getInstance: function (tagFilter, userId) {
				return mockedGalleryService;
			}
		}
	}));

	let controller;
	let $stateParams = {userId: 42};

	beforeEach(angular.mock.inject(function (_$controller_, _galleryServiceFactory_, _user_) {
		let $controller = _$controller_;
		controller = $controller('UserGalleryController', {$stateParams: $stateParams});
	}));

	it('should be defined', function () {
		expect(controller).toBeDefined();
	});

	describe('.videos.get()', function () {
		it('should exist', function () {
			expect(controller.videos.get).toBeDefined();
		});

		it('must be not loading', function () {
			expect(controller.videos.isLoading).toEqual(false);
		});

		it('must have a successfull callback', function () {
			let spy = spyOn(controller.userService, 'getUser').and.returnValue(Promise.resolve(true));
			controller.userService.getUser();
			expect(controller.videos.isLoading).toEqual(false);
			//
			spy.calls.mostRecent().returnValue.then(() => {
				controller.videos.get();

				expect(controller.videos.isLoading).toEqual(true);
			});

		});
	});

});
