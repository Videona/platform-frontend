angular.module('app')
	.directive('videoCard', videoCardDirective);

function videoCardDirective() {
	
	function link(scope, element, attr) {
		scope._id = scope.video._id;
		scope.title = scope.video.title;
		scope.poster = scope.video.poster;
		scope.productType = scope.video.productType;
		scope.isVerified = scope.video.isVerified;
		
		scope.size = {
			width: scope.width,
			height: scope.height
		}
	}
	
	return {
		scope: {
			video: '<',
			width: '<',
			height: '<'
		},
		link: link,
		templateUrl: 'components/video-card/video-card.view.html'
	};
}