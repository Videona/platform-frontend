(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('en_us', {
			HELLO: 'Hello',
			WORLD: 'world',

			LOADING: 'loading...',

			LOGIN: 'Login',
			REGISTER: 'Register',
			USERNAME: 'Username',
			PASSWORD: 'Password',
			EMAIL: 'Email',
			FORGOTTEN_PASSWORD: 'Forgotten password?',
			LOGIN_ACTION: 'Log in',
			REGISTER_ACTION: 'Register',
			NEXT_ACTION: 'Next',
			WRONG_LOGIN: 'Wrong user or password. Please, try again.',
			WRONG_REGISTER: 'Wrong register data. Check it out, and try again, please.',
			REGISTER_SLOGAN: 'Mobile Journalism app for Breaking\n the video editing barrier on mobile',
			QUESTION_AGE: 'How old are you?',
			ACCEPT_CONDITIONS_1: 'I\'ve read and I accept ',
			CONDITIONS: 'the terms of service',
			ACCEPT_CONDITIONS_2: ' of Vimojo',
			COMPLETED: 'Ready!',
			ERROR_USERNAME_EMPTY: 'The field username is empty.',
			ERROR_USERNAME_MIN_LENGTH: 'The username is less than 5 characters long.',
			ERROR_USERNAME_MAX_LENGTH: 'The username is longer than 30 characters long',
			ERROR_USERNAME_ALREADY_IN_USE: 'The username is already in use. Try a new one.',
			ERROR_PASSWORD_EMPTY: 'The field password is empty.',
			ERROR_PASSWORD_MIN_LENGTH: 'The password is less than 5 characters long.',
			ERROR_PASSWORD_MAX_LENGTH: 'The password is longer than 30 characters long',
			ERROR_EMAIL_EMPTY: 'The field email is empty.',
			ERROR_EMAIL_MIN_LENGTH: 'The email is less than 5 characters long.',
			ERROR_EMAIL_MAX_LENGTH: 'The email is longer than 30 characters long',
			ERROR_EMAIL_NOT_VALID: 'The email is not valid.',
			ERROR_EMAIL_ALREADY_IN_USE: 'The email is already in use. Try a new one',
			ERROR_AGE_EMPTY: 'The field age is empty',
			ERROR_AGE_WRONG: 'The age must be valid',
			ERROR_TERMS_EMPTY: 'You must accept the terms and conditions of the service',
			ERROR_RECAPTCHA_NOT_CHECKED: 'This app only is able to be used by humans. Aren\'t you human?',
			GALLERY_FEATURED_VIDEOS: 'Featured videos',
			GALLERY_VIEW_ALL: 'View all',
			GALLERY_ORDER_BY: 'Order by',
			GALLERY_ORDER_BY_SELECTOR_RELEVANCE: 'Relevance',
			VIDEO_VERIFIED: 'Verified',
			VIDEO_NOT_VERIFIED: 'Not verified',
			DOWNLOAD_CODE: 'Enter your download code',
			DOWNLOAD_VIDEO: 'Download Video',
			ERROR_DOWNLOAD_VIDEO: 'Error downloading video',
			ERROR_DOWNLOAD_VIDEO_NOT_EXISTS: 'We can not find this video. Please, check that this resource is correct and try again.',
			BACK_TO_GALLERY: 'Back to gallery',
			ERROR_WRONG_DOWNLOAD_CODE: 'Invalid download code',
			ERROR_UNABLE_TO_DOWNLOAD: 'Unable to download this video',

			UPLOADED_AT: 'Uploaded at',
			SHOW_VIDEO_DETAILS: 'Show video details',
			HIDE_VIDEO_DETAILS: 'Hide video details',

			USER_PROFFESSIONAL: 'Professional',
			PUBLISHED_VIDEOS: 'Published videos',

			VIDEO_DETAIL_DATETIME: 'Date and time',
			VIDEO_DETAIL_CATEGORIES: 'Categories',
			VIDEO_DETAIL_PRODUCT_TYPE: 'Type',
			VIDEO_DETAIL_LENGTH: 'Length',
			VIDEO_DETAIL_TECHNICAL_DETAILS: 'Technical details',
			VIDEO_DETAIL_TAGS: 'Tags',
			VIDEO_DETAIL_LANGUAGE: 'Language',
			VIDEO_DETAIL_QUALITY: 'Quality',
			VIDEO_DETAIL_CREDIBILITY: 'Credibility',
			VIDEO_AUTHOR: 'Autor',
			
			VIDEO_ERROR: 'Error in video',
			VIDEO_NOT_FOUND: 'We couldn\'t find that video. Please, check that the link is correct and try again.',

			DROP_VIDEO: 'Drop your video here or click to upload',
			UPLOADING_FILE: 'Uploading video...',
			UPLOAD_TITLE_PLACEHOLDER: 'Title',
			UPLOAD_DESCRIPTION_PLACEHOLDER: 'Description',
			UPLOAD_SEND: 'Upload video',
			UPLOAD_ERROR_DATA: 'File not selected or data not setted.',

			PRODUCT_TYPE_LIVE_ON_TAPE: 'Live on tape',
			PRODUCT_TYPE_B_ROLL: 'B-roll',
			PRODUCT_TYPE_NAT_VO: 'Nat/VO',
			PRODUCT_TYPE_INTERVIEW: 'Interview',
			PRODUCT_TYPE_GRAPHICS: 'Graphics',
			PRODUCT_TYPE_PIECE: 'Piece',
			
			BUTTON_READ_ALL: 'Read all',
			BUTTON_READ_LESS: 'Read less',
			BUTTON_EDIT: 'Edit',

			// Search page
			SHOWING_RESULTS_FOR: 'Showing {{count}} results for',

			// User Gallery page
			USER_GALLERY_USER_VIDEOS: '{{username}} videos',
			USER_GALLERY_USER_NOT_FOUND_TITLE: 'User not found',
			USER_GALLERY_USER_NOT_FOUND_DESCRIPTION: 'We could not find this user. Please, check that link is correct and try again.',
		});
	}
}());
