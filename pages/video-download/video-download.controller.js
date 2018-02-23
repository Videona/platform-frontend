angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', '$translate', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload, $translate) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.error = null;

	self.video = video;

	self.download = download;

	// ToDo: Check invalid video :S
	self.video.get(self.id, function() {
		self.loading = false;
	});


	function download() {
		self.error = null;
		self.loading = true;
		videoDownload.get(self.id, self.code, function(status) {
			self.loading = false;
			console.log(status);
			if(status !== 200) {
				self.error = $translate.instant('ERROR_WRONG_DOWNLOAD_CODE');
			}
		});
	}
}
