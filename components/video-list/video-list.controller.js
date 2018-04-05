(function () {
	angular.module('app')
		.controller('VideoListController', ['api', '$httpParamSerializer', VideoListController]);

	function VideoListController(api, $httpParamSerializer) {
		var self = this;

		// Component bindings
		self.sectionClass;
		self.userId;
		self.tagFilter;
		self.infiniteScrollEnabled;

		// Properties
		self.loading = false;
		self.videos = [];
		self.queryParams = {
			order: '-date',
			offset: 0,
			limit: 10,
		};

		// Methods
		self.$onInit = onInit;
		self.infinite = infinite;

		// Internal functions
		function onInit() {
			if (self.tagFilter instanceof Array && self.tagFilter.length > 0) {
			  createTagFilter(self.tagFilter);
			}
			getVideoList();
		}

		function createTagFilter(tagFilter) {
			self.queryParams.tag = tagFilter.filter(item => !item.startsWith('-'));
			self.queryParams.excludeTag = tagFilter.filter(function (item) { 
					return item.startsWith('-'); 
				}).map(item => item.substring(1));
		}

		function getQuery() {
			var baseQuery = '/video?';
			if (self.userId !== undefined) {
				baseQuery = '/user/' + self.userId + baseQuery;
			}
			return baseQuery + $httpParamSerializer(self.queryParams);
		}

		function getVideoList() {
			if(!self.loading) {
				// console.log('query url is ', api.url + getQuery());
				self.loading = true;
				api.get(api.url + getQuery(), function (data, status) {
					if (status < 400 && data.length > 0) {
						self.loading = false;
						self.videos = self.videos.concat(data);
						self.queryParams.offset += data.length;
					}
				});
			}
		}

		function infinite() {
			if (self.infiniteScrollEnabled) {
				getVideoList();
			}
		}
	}
	
}());
