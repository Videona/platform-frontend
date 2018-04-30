angular.module('app')
	.controller('SearchController', ['search', '$stateParams', SearchController]);

function SearchController(search, $stateParams) {
	var self = this;

	self.meta ={
		count: 0
	};

	self.service = search;
	
	self.service.search();
}
