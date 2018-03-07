angular.module('app')
	.controller('UploadController', ['api', UploadController]);

function UploadController(api) {
	var self = this;

	self.send = send;
	self.file;

	function send() {
		console.log('sending...');
		api.upload(api.url + '/video', self.file, {title: 'test ng-upload'}, function() {
			console.log('done!!');
		});
	}
}