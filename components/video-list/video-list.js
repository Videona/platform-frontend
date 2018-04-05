(function () {
	angular.module('app')
	.component('videoList', {
		bindings: {
			sectionClass: '@',
			userId: '=',
			tagFilter: '=',
			infiniteScrollEnabled: '=',
		},
		controller: 'VideoListController',
		controllerAs: 'VideoList', 
		templateUrl: 'components/video-list/video-list.view.html',
	});
}());
