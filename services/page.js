(function () {
	angular.module('app').service('page', ['flavourString', pageService]);
	
	function pageService(flavourString) {
		var page = {
			title: 'Vimojo Platform',
			pageTitle: getPageTitle 
		};

		return page;

		function getPageTitle() {
			return page.title + ' ' + flavourString.NAME;
		}
	}
}());
