angular.module('app')
	.service('videoDownload', ['api', videoDownloadService]);

function videoDownloadService(api) {
	var videoDownload = {
		get: get,
	};

	return videoDownload;


	function get(videoId, code, callback) {
		api.download(api.url + '/video/' + videoId + '/original?code=' + code, function (data, status, headers) {
			if (status >= 400) {
				console.error('Unable to download file.');
			}
			callback(status);
		});
	}
}
