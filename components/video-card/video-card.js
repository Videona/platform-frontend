angular.module('app')
	.directive('videoCard', ['moment', videoCardDirective]);

function videoCardDirective() {
	
	function link(scope, element, attr) {
		scope._id = scope.video._id;
		scope.title = scope.video.title;
		scope.poster = scope.video.poster;
		scope.author = scope.video.ownerData.username;
		scope.date = scope.video.date;
		scope.tag = scope.video.tag;
		scope.categories = scope.video.categories;
		scope.isVerified = scope.video.isVerified;
	}
	
	return {
		scope: {
			video: '<'
		},
		link: link,
		templateUrl: 'components/video-card/video-card.view.html'
	};
}