(function () {
	angular.module('app').service('page', ['flavourString', pageService]);
	
	function pageService(flavourString) {
		var page = {
			title: '',
			pageTitle: getPageTitle,
			setPageTitle: setPageTitle
		};

		return page;

		function getPageTitle() {
			return page.title;
		}
		
		function setPageTitle(firstName, secondName) {
			if (firstName) {
				page.title = firstName + ' - ';
				if (!secondName) {
					page.title += flavourString.NAME;
				} else {
					page.title += secondName;
				}
			} else {
				page.title = flavourString.NAME;
			}
		}
		
	}
}());
