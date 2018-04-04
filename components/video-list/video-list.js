(function () {
	class VideoListController {
		constructor(api, httpParamSerializer) {
			this.api = api;
			this.serializer = httpParamSerializer;
			this.loading = false;
			this.videos = [];
			this.queryParams = {
				order: '-date',
				offset: 0,
				limit: 10,
			};
		}

	  $onInit() {
		  if (this.tagFilter instanceof Array && this.tagFilter.length > 0) {
			  this.createTagFilter(this.tagFilter);
		  }
		  this.getVideoList();
	  }

		createTagFilter(tagFilter) {
			this.queryParams.tag = tagFilter.filter(item => !item.startsWith('-'));
			this.queryParams.excludeTag = tagFilter.filter(item => item.startsWith('-')).map(item => item.substring(1));
		}

		getQuery() {
			let baseQuery = '/video?';
			if (this.userId !== undefined) {
				baseQuery = '/user/' + this.userId + baseQuery;
			}
			return baseQuery + this.serializer(this.queryParams);
		}

		getVideoList() {
			console.log('query url is ', this.api.url + this.getQuery());
			this.loading = true;
			this.api.get(this.api.url + this.getQuery(), function (data, status) {
				if (status < 400 && data.length > 0) {
					this.loading = false;
					this.videos = this.videos.concat(data);
					this.queryParams.offset += data.length;
				}
			}.bind(this));
		}

		infinite() {
			if (this.infiniteScrollEnabled) {
				this.getVideoList();
			}
		}
	}

	angular.module('app')
	.component('videoList', {
		bindings: {
			sectionClass: '@',
			userId: '=',
			tagFilter: '=',
			infiniteScrollEnabled: '=',
		},
		controller: ['api', '$httpParamSerializer', (api, httpParamSerializer) => new VideoListController(api, httpParamSerializer)],
		controllerAs: 'VideoList',
		templateUrl: 'components/video-list/video-list.view.html',
	});
}());
