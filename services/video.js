angular.module('app')
	.service('video', ['api', videoService]);

function videoService(api) {
	var video = {
		data: null,
		get: get,
		reset: reset
	};

	return video;


	function get(videoId) {
		api.get(api.url + '/video/' + videoId, function (data) {
			video.data = data;
		});
	}

	function reset() {
		video.data = null;
	}
}
