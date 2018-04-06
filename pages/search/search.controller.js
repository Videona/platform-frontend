angular.module('app')
	.controller('SearchController', ['$timeout', '$state', '$stateParams', SearchController]);

function SearchController($timeout, $state, $stateParams) {
	var self = this;

	self.loading = false;
	self.searchBox = $stateParams.q || '';
	self.search = search;

	var lastSearchTerm = $stateParams.q || '';

	function search() {
		if(lastSearchTerm !== self.searchBox) {
			lastSearchTerm = self.searchBox;
			$state.go('.', {q: self.searchBox}, {notify: false});

			self.loading = true;
			$timeout(function () {
				self.loading = false;
			}, 0);
		}
	}
}
