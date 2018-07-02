(function () {
	angular.module('app')
		.controller('MainControler', ['page', 'gmapsApiKey', 'session', MainController]);

	function MainController(page, gmapsApiKey, session) {
		const self = this;
		self.page = page;
		self.gmapsApiKey = gmapsApiKey;
		self.currentLang = session.currentLang;
	}
}());