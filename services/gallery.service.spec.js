describe('Gallery (video api) factory', function () {
	let galleryFactory;

	beforeEach(angular.mock.module('app'));
	beforeEach(mockApi);
	beforeEach(inject(function (_galleryServiceFactory_) {
		galleryFactory = _galleryServiceFactory_;
	}));


	it('should exist', function () {
		expect(galleryFactory).toBeDefined();
	});

	describe('service instance', function () {
		it('should exist', function () {
			expect(galleryFactory.getInstance).toBeDefined();
		});

		it('should have no videos before calling the callback', function () {
			const gallery = galleryFactory.getInstance();
			expect(gallery.videos.length).toBe(0);
		});

		it('should have default query params limit of 10 items', function () {
			const gallery = galleryFactory.getInstance();
			expect(gallery.queryParams.limit).toEqual(10);
			expect(gallery.queryParams.offset).toEqual(0);
			expect(gallery.queryParams.order).toEqual('-date');
			expect(gallery.queryParams.tag).toBeUndefined();
			expect(gallery.queryParams.excludeTag).toBeUndefined();
		});
	});
});

function mockApi() {
	mockedApi = {
		get: function (uri, cb) {
			setTimeout(function () {
				cb(true, {});
			}, 100);
			return true;
		},
	};
}

describe('UserGallery (video api) service', function () {
	const mockedApi = null;
	let callback = null;
	let serializerSpy = null;

	function createCallbackSpy() {
		callback = jasmine.createSpy('callback');
	}
	function createSerializerSpy() {
		serializerSpy = jasmine.createSpy();
	}
	beforeEach(createCallbackSpy);
	beforeEach(mockApi);
	beforeEach(createSerializerSpy);

	it('does not set tag filters if no filters param passed', function () {
		const service = new GalleryService(mockedApi);

		expect(service.queryParams.tag).toBeUndefined();
		expect(service.queryParams.excludeTag).toBeUndefined();
	});

	it('set user if int userId is provided', function () {
		const service = new GalleryService(mockedApi, serializerSpy, [], 42);

		expect(service.userId).toBe(42);
	});

	it('does not set user if non int userId is provided', function () {
		const service = new GalleryService(mockedApi, serializerSpy, [], '');

		expect(service.userId).toBeUndefined();
	});


	describe('.createTagFilter', function () {
		it('should exists', function () {
			const service = new GalleryService(mockedApi, serializerSpy, []);

			expect(service.createTagFilter).toBeDefined();
		});

		it('should be called in constructor with tags param', function () {
			const tagFilter = ['oneTag'];
			const createTagFilterSpy = spyOn(GalleryService.prototype, 'createTagFilter');

			const service = new GalleryService(mockedApi, serializerSpy, tagFilter);

			expect(createTagFilterSpy).toHaveBeenCalled();
		});

		it('should set tag filter with tags passed', function () {
			const tagFilter = ['oneTag', 'anotherTag'];

			const service = new GalleryService(mockedApi, serializerSpy, tagFilter);

			expect(service.queryParams.tag).toEqual(['oneTag', 'anotherTag']);
		});

		it('should set excludeTag filter with tags passed with a -', function () {
			const tagFilter = ['oneTag', 'anotherTag', '-excludedTag'];

			const service = new GalleryService(mockedApi, serializerSpy, tagFilter);

			expect(service.queryParams.tag).toEqual(['oneTag', 'anotherTag']);
			expect(service.queryParams.excludeTag).toEqual(['excludedTag']);
		});
	});

	describe('getQuery', function () {
		it('should exist', function () {
			const service = new GalleryService(mockedApi, serializerSpy);

			expect(service.getQuery).toBeDefined();
		});

		it('should call $httpParamSerializer', function () {
			const service = new GalleryService(mockedApi, serializerSpy, ['tag1', '-tag2', 'tag3']);

			const query = service.getQuery();

			expect(serializerSpy).toHaveBeenCalledWith({
				order: service.queryParams.order,
				offset: service.queryParams.offset,
				limit: service.queryParams.limit,
				tag: ['tag1', 'tag3'],
				excludeTag: ['tag2'],
			});
		});

		it('defines /videos as query base', function () {
			serializerSpy = jasmine.createSpy().and.returnValue('queryparams');
			const service = new GalleryService(mockedApi, serializerSpy);

			const query = service.getQuery();

			// expect(query).toStartWith('/video');
			expect(query).toBe('/video?queryparams');
		});

		it('prepends user if userId is provided', function () {
			serializerSpy = jasmine.createSpy().and.returnValue('queryparams');
			const service = new GalleryService(mockedApi, serializerSpy, [], 42);

			const query = service.getQuery();

			// expect(query).toStartWith('/user/42');
			expect(query).toBe('/user/42/video?queryparams');
		});
	});

	// TODO(jliarte): tests for getVideos
	// it('should execute callback', function () {
	// 	galleryFactory.getVideoList(callback);
	// 	expect(callback).not.toHaveBeenCalled();
	// 	jasmine.clock().tick(101);
	// 	expect(callback).toHaveBeenCalled();
	// });
});
