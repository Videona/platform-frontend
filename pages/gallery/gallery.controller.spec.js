describe('Gallery Controller', function () {
	beforeEach(angular.mock.module('app'));
	
	var $controller;
	
	var FEATURED_RESPONSE_SUCCESS = {
		date: "2018-02-27T12:47:09.762Z",
		description: "Description test",
		owner: "1",
		poster: "http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.png",
		tag: "featured",
		title: "Title test",
		video: "http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.mp4",
		_id: "20"
	};
	
	var NOT_FEATURED_RESPONSE_SUCCESS = {
		date: "2018-02-27T12:48:44.920Z",
		description: "Description test",
		owner: "1",
		poster: "http://local_cloud_storage/uploads/34aa93e10390d721fb9db153d97ab0f8.png.png",
		title: "Title test",
		video: "http://local_cloud_storage/uploads/34aa93e10390d721fb9db153d97ab0f8.mp4",
		_id: "110"
	};
	
	var GalleryServiceMock = {
		getFeaturedVideoList: function (cb) {
			setTimeout(function () {
				if (cb === true) {
					cb(true, [FEATURED_RESPONSE_SUCCESS]);
				} else {
					cb(false, {});
				}
			}, 100);
			return true;
		},
		getNotFeaturedVideoList: function (cb) {
			setTimeout(function () {
				if (cb === true) {
					cb(true, [NOT_FEATURED_RESPONSE_SUCCESS]);
				} else {
					cb(false, [{}])
				}
			}, 100);
			return true;
		},
	};
	
	beforeEach(inject(function(_$controller_, _gallery_) {
		$controller = _$controller_;
		controller = $controller('GalleryController', { gallery: GalleryServiceMock });
	}));
	
	it('should be defined', function () {
		expect(controller).toBeDefined();
	});
	
	describe('.featured.get()', function () {
		it('should exist', function () {
			expect(controller.featured.get).toBeDefined();
		});
		
//		it('must be not loading', function () {
//			expect(controller.featured.isLoading).toEqual(false);
//		});
		
		it('should initialize b')
		
		it ('must have a successfull callback', function () {
			controller.featured.get();
			expect(controller.featured.isLoading).toEqual(true);
//			expect(callback).not.toHaveBeenCalled();
//			jasmine.clock().tick(101);
//			expect(callback).toHaveBeenCalled();
		});

	});
	
	describe('.notFeatured.get()', function () {
		it('should exist', function () {
			expect(controller.notFeatured.get).toBeDefined();
		});
		
//		it('must be not loading', function () {
//			expect(controller.notFeatured.isLoading).toEqual(false);
//		});
		
		it ('must have a successfull callback', function () {
			controller.notFeatured.get();
			expect(controller.notFeatured.isLoading).toEqual(true);
//			expect(callback).not.toHaveBeenCalled();
//			jasmine.clock().tick(101);
//			expect(callback).toHaveBeenCalled();
		});
	});
});
