function mockApi() {
	return {
		url: 'here',
		get: function (uri, cb) {
			setTimeout(function () {
				cb(true, {});
			}, 100);
			return true;
		},
	};
}

describe('VideoListController', function () {
	beforeEach(angular.mock.module('app'));

	let mockedApi = null;
	let callback = null;
	let serializerSpy = null;

	function createCallbackSpy() {
		callback = jasmine.createSpy('callback');
	}
	function createSerializerSpy() {
		serializerSpy = jasmine.createSpy();
	}
	beforeEach(createCallbackSpy);
	beforeEach(function () {
		mockedApi = mockApi();
	});
	beforeEach(createSerializerSpy);

	// let videoListCtrl;
	let $componentController;

	beforeEach(inject(function (_$componentController_) {
		$componentController = _$componentController_;
	}));


	function getVideoListController(userId, tagFilter) {
		return $componentController('videoList',
			{api: mockedApi, $httpParamSerializer: serializerSpy},
			{
				// bindings
				userId: userId,
				tagFilter: tagFilter,
				infiniteScrollEnabled: false,
			});
	}

	function getVideoListControllerWithoutUser(tagFilter) {
		return $componentController('videoList',
			{api: mockedApi, $httpParamSerializer: serializerSpy},
			{
				// bindings
				tagFilter: tagFilter,
				infiniteScrollEnabled: false,
			});
	}

	it('does not set tag filters if no filters param passed', function () {
		const videoListCtrl = getVideoListController(0, []);

		expect(videoListCtrl.queryParams.tag).toBeUndefined();
		expect(videoListCtrl.queryParams.excludeTag).toBeUndefined();
	});

	it('set user if int userId is provided', function () {
		const videoListCtrl = getVideoListController(42, []);

		expect(videoListCtrl.userId).toBe(42);
	});

	it('does not set user if non int userId is provided', function () {
		const videoListCtrl = getVideoListController(undefined, []);

		expect(videoListCtrl.userId).toBeUndefined();
	});


	describe('.createTagFilter', function () {
		it('should exists', function () {
			const videoListCtrl = getVideoListController(0, []);

			expect(videoListCtrl.createTagFilter).toBeDefined();
		});

		it('should be called in constructor with tags param', function () {
			const tagFilter = ['oneTag'];
			const videoListCtrl = getVideoListController(0, tagFilter);
			const createTagFilterSpy = spyOn(videoListCtrl, 'createTagFilter');

			videoListCtrl.$onInit();

			expect(createTagFilterSpy).toHaveBeenCalled();
		});

		it('should set tag filter with tags passed', function () {
			const tagFilter = ['oneTag', 'anotherTag'];
			const videoListCtrl = getVideoListController(0, tagFilter);

			videoListCtrl.$onInit();

			expect(videoListCtrl.queryParams.tag).toEqual(['oneTag', 'anotherTag']);
		});

		it('should set excludeTag filter with tags passed with a -', function () {
			const tagFilter = ['oneTag', 'anotherTag', '-excludedTag'];
			const videoListCtrl = getVideoListController(0, tagFilter);

			videoListCtrl.$onInit();

			expect(videoListCtrl.queryParams.tag).toEqual(['oneTag', 'anotherTag']);
			expect(videoListCtrl.queryParams.excludeTag).toEqual(['excludedTag']);
		});
	});

	describe('getQuery', function () {
		it('should exist', function () {
			const videoListCtrl = getVideoListController(0, []);

			expect(videoListCtrl.getQuery).toBeDefined();
		});

		it('should call $httpParamSerializer', function () {
			let user;
			const videoListCtrl = getVideoListController(user, ['tag1', '-tag2', 'tag3']);
			videoListCtrl.$onInit();

			const query = videoListCtrl.getQuery();

			expect(serializerSpy).toHaveBeenCalledWith({
				order: videoListCtrl.queryParams.order,
				offset: videoListCtrl.queryParams.offset,
				limit: videoListCtrl.queryParams.limit,
				tag: ['tag1', 'tag3'],
				excludeTag: ['tag2'],
			});
		});

		it('defines /videos as query base', function () {
			serializerSpy = jasmine.createSpy().and.returnValue('queryparams');
			const videoListCtrl = getVideoListControllerWithoutUser([]);
			videoListCtrl.$onInit();

			const query = videoListCtrl.getQuery();

			// expect(query).toStartWith('/video');
			expect(query).toBe('/video?queryparams');
		});

		it('prepends user if userId is provided', function () {
			serializerSpy = jasmine.createSpy().and.returnValue('queryparams');
			const videoListCtrl = getVideoListController(42, []);

			const query = videoListCtrl.getQuery();

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
