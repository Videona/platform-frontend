angular.module('app')
	.controller('UploadController', ['api', 'session', '$state', '$translate', 'productType', 'page', 'authService',
		UploadController]);

function UploadController(api, session, $state, $translate, productType, page, authService) {
	const self = this;

	this.$onInit = function () {
		authService.requireLoggedUser();
	};

	self.error = null;
	self.progress = null;
	self.file;
	self.data;
	self.loading = false;
	self.productTypes = productType;

	self.send = send;
	
	// Setup page title
	page.setPageTitle($translate.instant('UPLOAD_TITLE'));

	function send() {
		console.log('sending...');

		const data = {};

		if (canUpload()) {
			self.error = null;
			data.title = self.data.title || undefined;
			data.description = self.data.description || undefined;
			data.productType = [];
			
			if (self.data.productType) {
				for (const type in self.data.productType) {
					if (self.data.productType[type]) {
						data.productType.push(type);
					}
				}
			}

			data.productType = data.productType.toString();

			self.loading = true;
			api.upload(api.url + '/video', self.file, data, function () {
				self.loading = false;
				$state.go('userGallery', {userId: session.id});
			}, function (c) {
				console.log(c);
				self.progress = c;
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