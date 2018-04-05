(function () {
	class Page {
		constructor() {
			this.title = 'Vimojo Platform';
		}
	}
	angular.module('app').service('page', Page);
}());
