angular.module('app')
	.service('video', ['api', videoService]);

function videoService(api) {
	var video = {
		data: null,
		get: get,
		reset: reset,
		getVideoLangs: getVideoLangs,
	};

	return video;

	function get(videoId, callback) {
		api.get(api.url + '/video/' + videoId, function (data, status) {
			video.data = data;
			if(callback && typeof callback === 'function') {
				callback(data, status);
			}
		});
	}

	function getVideoLangs() {
		return new Promise((resolve, reject) => {
			api.get(api.url + '/video/lang', function (videoLangs, status) {
				console.log("video langs are: ", videoLangs);
				if (videoLangs != undefined && status <= 400) {
					resolve(videoLangs);
				}
				reject(status);
			});
		});
	}

	function reset() {
		video.data = null;
	}
}
