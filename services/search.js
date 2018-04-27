(function () {
	angular.module('app')
		.service('search', ['$stateParams', '$state', '$timeout', searchService]);
	
	function searchService($stateParams, $state, $timeout) {
		var lastSearchTerm = $stateParams.q || '';
		var self = {
			loading: false,
			searchBox: $stateParams.q || '',
			searchTerm: ($stateParams.q) ? $stateParams.q.toLowerCase() : '',
			search: search 
		};

		return self;

		function search() {
			if($state.current.name !== 'search' || lastSearchTerm !== self.searchBox) {
				lastSearchTerm = self.searchBox;
				self.searchTerm = self.searchBox.toLowerCase();
				goToSearch();

				self.loading = true;
				$timeout(function () {
					self.loading = false;
				}, 0);
			}
		}

		function goToSearch() {
			var notify = !($state.current.name === 'search');
			console.log(notify);
			if(($state.current.name === 'search')) {
				$state.go('.', {q: self.searchBox}, {notify: false});
			} else {
				$state.go('search', {q: self.searchBox});
			}
		}
	}
}());
