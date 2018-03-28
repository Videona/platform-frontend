class GalleryService {
	constructor(api, httpParamSerializer, tagFilter, userId) {
		this.api = api;
		this.serializer = httpParamSerializer;
		this.videos = [];
		this.queryParams = {
			order: '-date',
			offset: 0,
			limit: 10,
		};
		if (tagFilter instanceof Array && tagFilter.length > 0) {
			this.createTagFilter(tagFilter);
		}
		if (userId == parseInt(userId, 10)) {
			this.userId = parseInt(userId, 10);
		}
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

	getVideoList(cb) {
		console.log('query url is ', this.api.url + this.getQuery());
		this.api.get(this.api.url + this.getQuery(), function (data, status) {
			let success = false;
			if (status < 400 && data.length > 0) {
				this.videos = this.videos.concat(data);
				this.queryParams.offset += data.length;
				success = true;
			}
			cb(success);
		}.bind(this));
	}
}

function galleryServiceGenerator(api, $httpParamSerializer) {
	return {
		getInstance: function (tagFilter, userId) {
			return new GalleryService(api, $httpParamSerializer, tagFilter, userId);
		},
	};
}

angular.module('app')
	.service('galleryServiceFactory', ['api', '$httpParamSerializer', galleryServiceGenerator]);
