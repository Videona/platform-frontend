angular.module('app')
	.controller('SearchController', ['search', '$stateParams', 'page', SearchController]);

function SearchController(search, $stateParams, page) {
	var self = this;
	
	// Setup page title
	page.setPageTitle($stateParams.q);

	self.meta ={
		count: 0
	};

	self.service = search;
	
	self.service.search();
}
