(function () {
	angular.module('app')
		.controller('MainControler', ['page', MainController]);

	function MainController(page) {
		var self = this;
		self.page = page;
	}
}());