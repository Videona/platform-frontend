angular.module('app')
	.service('gallery', ['api', galleryService]);

function galleryService(api) {
	var gallery = {
		featuredOffset: 0,
		notFeaturedOffset: 0,
		featured: [],
		notFeatured: [],
		getFeaturedVideoList: getFeaturedVideoList,
		getNotFeaturedVideoList: getNotFeaturedVideoList
	};

	return gallery;

	function getFeaturedVideoList(cb) {
		var limit = 15;
		
		api.get(api.url + '/video?tag=featured&limit=' + limit + '&order=-date&offset=' + gallery.featuredOffset, function (data, status) {
			var success = false;
			
			if (status < 400 && data.length > 0) {
				gallery.featured = gallery.featured.concat(data);
				gallery.featuredOffset += limit;
				success = true;
			}
			
			cb(success);
		});
	}
	
	function getNotFeaturedVideoList(cb) {
		var limit = 10;
		
		api.get(api.url + '/video?excludeTag=featured&limit=' + limit + '&order=-date&offset=' + gallery.notFeaturedOffset, function (data, status) {
			var success = false;
			
			if (status < 400 && data.length > 0) {
				gallery.notFeatured = gallery.notFeatured.concat(data);
				gallery.notFeaturedOffset += limit;
				success = true;
			}

			cb(success);
		});
	}
}
