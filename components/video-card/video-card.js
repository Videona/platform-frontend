angular.module('app')
	.directive('videoCard', VideoCard);

function VideoCard() {
	
	function link(scope, element, attr) {
		scope._id = scope.video._id;
		scope.title = scope.video.title;
		scope.poster = scope.video.poster;
		scope.productType = scope.video.productType;
		scope.isVerified = scope.video.isVerified;
	}
	
	return {
		scope: {
			video: '<',
			width: '<'
		},
		link: link,
		templateUrl: 'components/video-card/video-card.view.html'
	};
}