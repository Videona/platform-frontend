angular.module('app')
	.service('video', ['api', videoService]);

function videoService(api) {
	var video = {
		data: null,
		get: get,
		reset: reset,
	};

	return video;


	function get(videoId, callback) {
		api.get(api.url + '/video/' + videoId, function (data, status) {
			video.data = data;
			if (callback && typeof callback === 'function') {
				callback(data, status);
			}
		});
	}

	function reset() {
		video.data = null;
	}
}
