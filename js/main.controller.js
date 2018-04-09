(function () {
	angular.module('app')
		.controller('MainControler', ['page', 'gmapsApiKey', 'session', MainController]);

	function MainController(page, gmapsApiKey, session) {
		var self = this;
		self.page = page;
		self.gmapsApiKey = gmapsApiKey;
		self.currentLang = session.currentLang;
	}
}());