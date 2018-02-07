angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';

	self.video = video;

	self.download = download;

	self.video.get(self.id);


	function download() {
		videoDownload.get(self.id, self.code);
	}
}
