angular.module('app')
	.service('videoDownload', ['api', videoDownloadService]);

function videoDownloadService(api) {
	var videoDownload = {
		loading: false,
		get: get,
	};

	return videoDownload;


	function get(videoId, code, callback) {
		videoDownload.loading = true;
		api.download(api.url + '/video/' + videoId + '/original?code=' + code, function (data, status, headers) {
			videoDownload.loading = false;
			if (status >= 400) {
				console.error('Unable to download file.');
			}
			callback(status);
		});
	}
}
