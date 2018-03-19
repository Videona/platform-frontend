angular.module('app')
	.directive('videoList', [VideoList]);
// angular.module('app', ['infinite-scroll'])

function VideoList() {
	var self = this;

	self.isLoading = false;

	return {
		scope: {
			videosPerRow: '=',
			width: '=',
			height: '=',
			infinite: '&',
			loading: '=',
			datasource: '=',
			sectionClass: '@',
		},
		restrict: 'E',
		templateUrl: function (elem, attr) {
			// TODO(jliarte): different templates for different types?
			let type = 'non-featured';
			if (attr.type !== undefined) {
				type = attr.type;
			}
			return 'components/video-list/video-list-' + type + '.view.html';
		},
		// templateUrl: 'components/video-list/video-list-non-featured.view.html'
	};
}
