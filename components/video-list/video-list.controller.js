(function () {
	angular.module('app')
		.controller('VideoListController', ['session', 'api', '$httpParamSerializer', VideoListController]);

	function VideoListController(session, api, $httpParamSerializer) {
		var self = this;

		// Component bindings
		self.sectionClass;
		self.userId;
		self.tagFilter;
		self.infiniteScrollEnabled;
		self.featured;

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
			if (!self.videos) {
				self.videos = [];
			}
			if (self.tagFilter instanceof Array && self.tagFilter.length > 0) {
			  createTagFilter(self.tagFilter);
			}
			
			if(typeof self.featured !== 'undefined') {
				createFeaturedFilter(self.featured);
			}

			if (typeof self.query === 'string' && self.query.trim() !== '') {
				createQueryFilter(self.query);
			}

			getVideoList();
		}

		function createQueryFilter(query) {
			self.queryParams.q = query;
		}

		function createTagFilter(tagFilter) {
			self.queryParams.tag = tagFilter.filter(item => !item.startsWith('-'));
			self.queryParams.excludeTag = tagFilter.filter(function (item) { 
					return item.startsWith('-'); 
				}).map(item => item.substring(1));
		}

		function createFeaturedFilter(featured) {
			self.queryParams.featured = featured;
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
				console.log('query url is ', api.url + getQuery());
				self.loading = true;
				api.get(api.url + getQuery(), function (data, status) {
					if (status < 400 && data.length > 0) {
						self.loading = false;
						if (session.role == 'editor' || (session.id === self.userId)) {
							self.videos = self.videos.concat(data);
						} else {
							self.videoList = self.videos.concat(data);
							var videoListVerfied = [];
							for (var i = 0; i < self.videoList.length; i++) {
							  if (self.videoList[i].verified == true) {
							  	videoListVerfied.push(self.videoList[i]);
							  }
							}
							self.videos = videoListVerfied;
							console.log(' videos verified ', videoListVerfied);
						}
						if(self.meta) {
							self.meta.count = self.videos.length;
						}
						console.log(' videos ', self.videos);
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
