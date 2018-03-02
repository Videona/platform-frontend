describe('Gallery service', function () {
	beforeEach(angular.mock.module('app'));

	var mockApi = null;
	var callback = null;

	// Mock API service
	beforeEach(function() {
		mockApi = {
			get: function (uri, cb) {
				setTimeout(function() {
					cb(true, {});
				}, 100);
				return true;
			}
		};

		module(function ($provide) {
			$provide.value('api', mockApi);
		});
	});
	
	
	beforeEach(function() {
		callback = jasmine.createSpy('callback');
	});
	
	beforeEach(inject(function(_gallery_) {
		gallery = _gallery_;
	}));
	
	it('should exist', function () {
		expect(gallery).toBeDefined();
	});
	
	describe('.getFeaturedVideoList()', function () {
		it('should exist', function () {
			expect(gallery.getFeaturedVideoList).toBeDefined();
		});
		
		it('should have empty values before calling the callback', function() {
			expect(gallery.featuredOffset).toEqual(0);
			expect(gallery.featured).toEqual([]);
		});
		
		it('should execute callback', function() {
			gallery.getFeaturedVideoList(callback);
			expect(callback).not.toHaveBeenCalled();
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
		});
	});
	
	
	describe('.getNotFeaturedVideoList()', function () {
		it('should exist', function () {
			expect(gallery.getNotFeaturedVideoList).toBeDefined();
		});
		
		it('should have empty values before calling the callback', function() {
			expect(gallery.notFeaturedOffset).toEqual(0);
			expect(gallery.notFeatured).toEqual([]);
		});
		
		it('should execute callback', function() {
			gallery.getNotFeaturedVideoList(callback);
			expect(callback).not.toHaveBeenCalled();
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
		});
	});
	
});
