angular.module('app.flavour', [])
	.constant('flavourString', {
		NAME: 'Vimojo',
		IOS_APP: 'https://itunes.apple.com/us/app/vimojo/id1155451148?mt=8',
		ANDROID_APP: 'https://play.google.com/store/apps/details?id=com.videonasocialmedia.vimojo.main',
	})
	.constant('flavourFeature', {
		header: false
	});
