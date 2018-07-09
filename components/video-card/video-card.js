angular.module('app')
	.directive('videoCard', ['session', '$state', videoCardDirective]);

function videoCardDirective(session, $state) {
	
	function link(scope) {
		scope._id = scope.video._id;
		scope.title = scope.video.title;
		scope.poster = scope.video.poster;
		scope.published = scope.video.published;
		scope.time = scope.video.length;
		scope.author = scope.video.ownerData.username;
		scope.authorId = scope.video.ownerData._id;
		scope.date = scope.video.date;
		scope.tag = scope.video.tag;
		scope.locationName = scope.video.locationName;
		scope.categories = scope.video.categories;
		scope.productType = scope.video.productType;
		scope.verified = scope.video.verified;
		scope.owner = scope.video.owner;
		scope.showPublishedIcon = showPublishedIcon(scope.owner, scope.published);
	}

	function showPublishedIcon(owner, published) {
		if (session.role === 'editor' || (owner === session.id && $state.current.name === 'userGallery')) {
			return (published === true || published === 'true');
		}
		return false;
	}
	
	return {
		scope: {
			video: '<'
		},
		link: link,
		templateUrl: 'components/video-card/video-card.view.html'
	};
}