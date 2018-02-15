angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', '$translate', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload, $translate) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = false;
	self.error = null;

	self.video = video;

	self.download = download;

	self.video.get(self.id);


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
