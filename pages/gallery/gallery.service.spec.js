describe('Gallery service', function () {
	var GalleryService, $httpBackend;
	
	var API = 'http://localhost:3000/video';
	
	var featuredVideoList = [{
		date: "2018-02-27T12:47:09.762Z",
		description: "Esto es una descripción de la prueba",
		owner: "1",
		poster: "http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.png.png",
		tag: "featured",
		title: "Esto es una prueba",
		video: "http://local_cloud_storage/uploads/12b43980ebabbcddac394143082b1206.mp4",
		_id: "20"
	}];
	
	var notFeaturedVideoList = [{
		date: "2018-02-27T12:48:44.920Z",
		description: "Esto es una descripción de la prueba",
		owner: "1",
		poster: "http://local_cloud_storage/uploads/34aa93e10390d721fb9db153d97ab0f8.png.png",
		title: "Esto es una prueba",
		video: "http://local_cloud_storage/uploads/34aa93e10390d721fb9db153d97ab0f8.mp4",
		_id: "110"
	}];
	
	beforeEach(angular.mock.module('app'));
	
	beforeEach(inject(function(_gallery_, _$httpBackend_) {
		GalleryService = _gallery_;
		$httpBackend = _$httpBackend_;
	}));
	
	it('should exist', function () {
		expect(GalleryService).toBeDefined();
	});
	
	describe('.getFeaturedVideoList()', function () {
    beforeEach(function() {
      spyOn(GalleryService, "getFeaturedVideoList").and.callThrough();
    });
		
		it('should exist', function () {
			expect(GalleryService.getFeaturedVideoList).toBeDefined();
		});
		
		it('should verify the success response of the method', function () {
			$httpBackend.whenGET(API + '?tag=featured&limit=5&offset=0').respond(200, featuredVideoList);
//			expect(success).toBe(true);
			expect($scope.response.tag).toEqual("featured");
			expect(GalleryService.featuredOffset).toBe(15);
			expect(GalleryService.featured.length).toBe(1);
      $httpBackend.flush();
		});
		
		it('should return a 404 when the response array is empty', function() {
      $httpBackend.whenGET(API + '?tag=0').respond(404, {});
//			expect(success).toBe(false);
			expect(GalleryService.featuredOffset).toBe(15);
			expect(GalleryService.featured.length).toBe(0);
      $httpBackend.flush();
    });
	});
	
	
	describe('.getNotFeaturedVideoList()', function () {
		beforeEach(function() {
      spyOn(GalleryService, "getNotFeaturedVideoList").and.callThrough();
    });
		
		it('should exist', function () {
			expect(GalleryService.getNotFeaturedVideoList).toBeDefined();
		});
		
		it('should verify the success response of the method', function () {
			$httpBackend.whenGET(API + '?excludeTag=featured&limit=5&offset=0').respond(200, notFeaturedVideoList);
//			expect(success).toBe(true);
			expect(GalleryService.notFeaturedOffset).toBe(15);
			expect(GalleryService.notFeatured.length).toBe(1);
      $httpBackend.flush();
		});
		
		it('should return a 404 when the response array is empty', function() {
      $httpBackend.whenGET(API + '?excludeTag=0').respond(404, {});
//			expect(success).toBe(false);
			expect(GalleryService.notFeaturedOffset).toBe(15);
			expect(GalleryService.notFeatured.length).toBe(0);
      $httpBackend.flush();
    });
	});
	
});
