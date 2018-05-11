angular.module('app')
	.controller('UploadController', ['api', 'session', '$state', '$translate', 'productType', UploadController]);

function UploadController(api, session, $state, $translate, productType) {
	var self = this;

	// On Run...
	if (session.id <= 0) {
		console.log('Session not found! Redirecting...');
		$state.go('signin');
	}

	self.error = null;
	self.file;
	self.data;
	self.loading = false;
	self.productTypes = productType;

	self.send = send;

	function send() {
		console.log('sending...');

		var data = {};

		if (canUpload()) {
			self.error = null;
			data.title = self.data.title || undefined;
			data.description = self.data.description || undefined;
			data.productType = [];
			
			if (self.data.productType) {
				for (var type in self.data.productType) {
					if(self.data.productType[type]) {
						data.productType.push(type);
					}
				}
			}

			data.productType = data.productType.toString();

			self.loading = true;
			api.upload(api.url + '/video', self.file, data, function() {
				self.loading = false;
				$state.go('userGallery', {userId: session.id});
			});
		} else {
			self.error = $translate.instant('UPLOAD_ERROR_DATA');
		}
	}

	function canUpload() {
		return (!self.loading 
			&& self.file 
			&& self.data 
			&& self.data.title 
			&& self.data.description 
			&& self.data.productType
			&& Object.keys(self.data.productType).length > 0);
	}
}