angular.module('app')
	.service('gallery', ['api', galleryService]);

function galleryService(api) {
	var featuredOffset = 0;
	var notFeaturedOffset = 0;
	
	var gallery = {
		getFeaturedVideoList: getFeaturedVideoList,
		getNotFeaturedVideoList: getNotFeaturedVideoList
	};

	return gallery;

	function getFeaturedVideoList(cb) {
		var limit = 5;
		
		api.get(api.url + '/gallery?tag=highlighted&limit=' + limit + '&offset=' + featuredOffset, function (data, status) {
			var success = false;
			
			if (status < 400) {
				success = true;
			}
			
			featuredOffset += limit;
			
			cb(success, data);
		});
	}
	
	function getNotFeaturedVideoList(cb) {
		var limit = 20;
		
		api.get(api.url + '/gallery?excludeTag=highlighted&limit=' + limit + '&offset=' + notFeaturedOffset, function (data, status) {
			var success = false;
			
			if (status < 400) {
				success = true;
			}
			
			notFeaturedOffset += limit;
			
			cb(success, data);
		});
	}
}
