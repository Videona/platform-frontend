(function () {
	class MainController {
		constructor(page) {
			this.page = page;
		}
	}

	angular.module('app')
		.controller('MainControler', ['page', page => new MainController(page)]);
}());