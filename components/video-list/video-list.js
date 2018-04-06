(function () {
	angular.module('app')
	.component('videoList', {
		bindings: {
			sectionClass: '@',
			userId: '=',
			tagFilter: '=',
			query: '=',
			infiniteScrollEnabled: '=',
		},
		controller: 'VideoListController',
		controllerAs: 'VideoList', 
		templateUrl: 'components/video-list/video-list.view.html',
	});
}());
