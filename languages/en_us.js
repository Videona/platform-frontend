(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('en_us', {
			HELLO: 'Hello',
			WORLD: 'world',

			AND: 'and',

			// 404 directive
			DEFAULT404_ERROR_TITLE: 'Page not found',
			DEFAULT404_ERROR_MESSAGE: 'This page could not be found, please check the url.',

			LOADING: 'Loading...',
			LOADING_WAIT: 'Loading your page, please wait',

			// home page
			LANDING_HEADER: 'Suite for Mobile Journalism and Content Creators',
			LANDING_TRY_IT: 'Try it',
			LANDING_FOR_FREE: 'for free',
			// register page
			REGISTER_PAGE_TITLE: 'Create a new Vimojo account!',
			REGISTER_PAGE_FEATURES_HEADLINE: 'Empower your creativity and boost your storytelling with Vimojo',
			REGISTER_PAGE_PROMOTION_HEADLINE_START: 'Your ViMoJo',
			REGISTER_PAGE_PROMOTION_HEADLINE_END: 'is now Free!!',
			REGISTER_PAGE_PROMOTION_SUBHEAD: 'Get a free month of subscription and don\'t pay anything until',
			REGISTER_PAGE_PROMOTION_GRAPHICS_REGISTER: 'register',
			REGISTER_PAGE_PROMOTION_GRAPHICS_INSTALL_APPS: 'install apps',
			REGISTER_PAGE_PROMOTION_GRAPHICS_FREE_TRIAL: 'free trial',
			REGISTER_PAGE_CONDITIONS: 'Easy set up &#9680; try free for a month &#9680; cancel anytime',
			REGISTER_PAGE_TERMS_AGREE: 'By registering in ViMoJo you agree to our',
			TERMS_OF_SERVICE: 'Terms of Service',
			PRIVACY_POLICY: 'Privacy Policy',
			SIGN_IN: 'Sign in',
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

			// user profile menu in topbar
			PROFILE_MENU_ARIA_HINT: 'Open user menu',
			PROFILE_MENU_MY_VIDEOS: 'My videos',
			PROFILE_MENU_LOGOUT: 'Logout',
			PROFILE_MENU_HOW_IT_WORKS: 'How it works',

			GALLERY_FEATURED_VIDEOS: 'Featured videos',
			GALLERY_VIEW_ALL: 'View all',
			GALLERY_ORDER_BY: 'Order by',
			GALLERY_ORDER_BY_SELECTOR_RELEVANCE: 'Relevance',
			VIDEO_FEATURED: 'Featured',
			VIDEO_VERIFIED: 'Verified',
			VIDEO_NOT_VERIFIED: 'Not verified',
			DOWNLOAD_CODE: 'Enter your download code',
			DOWNLOAD_VIDEO: 'Download',
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
			UPLOADED_VIDEOS: 'Uploaded videos',

			VIDEO_DETAIL_DATETIME: 'Date and time',
			VIDEO_DETAIL_CATEGORIES: 'Categories',
			VIDEO_DETAIL_PRODUCT_TYPE: 'Type',
			VIDEO_DETAIL_LENGTH: 'Length',
			VIDEO_DETAIL_TECHNICAL_DETAILS: 'Technical details',
			VIDEO_DETAIL_TAGS: 'Tags',
			VIDEO_DETAIL_LANGUAGE: 'Language',
			VIDEO_DETAIL_QUALITY: 'Quality',
			VIDEO_DETAIL_CREDIBILITY: 'Credibility',
			VIDEO_PUBLISHED_CAPTION: 'Published',
			VIDEO_AUTHOR: 'Autor',
			'VIDEO_LANG_es-es': 'Spanish',
			'VIDEO_LANG_en-en': 'English',
			'VIDEO_LANG_gl-es': 'Galician',
			'VIDEO_LANG_ca-es': 'Catalan',
			'VIDEO_LANG_eu-es': 'Basque',
			VIDEO_LANG_ambient: 'Ambient',
			VIDEO_LANG_other: 'Other',
			VIDEO_CATEGORY_Events: 'Events',
			VIDEO_CATEGORY_International: 'International',
			VIDEO_CATEGORY_National: 'National',
			VIDEO_CATEGORY_Politics: 'Politics',
			VIDEO_CATEGORY_Sports: 'Sports',
			VIDEO_CATEGORY_Incidents: 'Incidents',
			VIDEO_CATEGORY_Culture: 'Culture',
			VIDEO_CATEGORY_Economy: 'Economy',
			VIDEO_CATEGORY_Health: 'Health',
			VIDEO_CATEGORY_Tourism: 'Tourism',
			VIDEO_DELETE: 'Delete',
			VIDEO_CANCEL: 'Cancel',
			VIDEO_SAVE: 'Save',
			VIDEO_DELETE_SUCCESS: 'Success deleting video',
			VIDEO_DELETE_FAILURE: 'Error deleting video ',
			VIDEO_DELETE_CONFIRM_TITLE: 'Would you like to delete this video?',
			VIDEO_DELETE_CONFIRM_TEXT: 'This action is permanent. Your video and all associated data will be deleted forever!',
			VIDEO_DELETE_CONFIRM_BUTTON_OK: 'Delete!',
			VIDEO_DELETE_CONFIRM_BUTTON_CANCEL: 'Cancel',
			VIDEO_EDIT_FEATURE: 'Feature',
			VIDEO_EDIT_VERIFY: 'Verify',
			VIDEO_EDIT_PUBLISH: 'Publish',
			VIDEO_EDIT_PICK_DATE: 'Pick a date',
			VIDEO_EDIT_THUMBNAIL_DEFAULT: 'Default thumbnail',
			VIDEO_EDIT_THUMBNAIL_CUSTOM: 'Custom thumbnail',
			VIDEO_EDIT_THUMBNAIL_CUSTOM_HINT: 'Replace current video thumbnail',
			VIDEO_EDIT_MSG_INVALID_FORM: 'There are errors processing your form, please check.',
			VIDEO_EDIT_MSG_VIDEO_UPDATED: 'Video updated!',
			VIDEO_EDIT_MSG_ERROR_UPDATING_VIDEO: 'Error updating video!',
			VIDEO_EDIT_VIDEO_FILE: 'Replace current video file',
			VIDEO_EDIT_VIDEO_FILE_HINT: 'Replace video',
			VIDEO_EDIT_VIDEO_FILE_MAX_SIZE: 'Max video size:',
			VIDEO_EDIT_CLICK_MAP_HINT: 'Enter address or click on the map to set the video location',
			VIDEO_EDIT_LOCATION_HINT: 'Use the map below to update the video location',
			VIDEO_EDIT_GOT_BROWSER_LOCATION: 'Using your browser location.',
			VIDEO_EDIT_TAG_HINT: 'Tags',
			VIDEO_EDIT_TAG_HINT_SECONDARY: 'Comma separated tags',
			VIDEO_DETAIL_PRICE_STD: 'Standard broadcast price',
			VIDEO_DETAIL_PRICE_COUNTRY: 'Country broadcast price',
			VIDEO_DETAIL_PRICE_CONTINENT: 'Continent broadcast price',
			VIDEO_DETAIL_PRICE_WORLD: 'World broadcast price',
			VIDEO_DETAIL_PRODUCT_TYPE_LONG: 'Product type',
			VIDEO_DETAIL_TITLE: 'Title',
			VIDEO_DETAIL_SUMMARY: 'Summary',
			VIDEO_DETAIL_LOCATION: 'Location',
			VIDEO_DETAIL_NOTES: 'Notes',


			VIDEO_ERROR: 'Error in video',
			VIDEO_NOT_FOUND: 'We couldn\'t find that video. Please, check that the link is correct and try again.',

			DROP_VIDEO: 'Drop your video here or click to upload',
			UPLOAD_TITLE: 'Upload',
			UPLOADING_FILE: 'Uploading video...',
			UPLOAD_TITLE_PLACEHOLDER: 'Title',
			UPLOAD_DESCRIPTION_PLACEHOLDER: 'Description',
			UPLOAD_SEND: 'Upload video',
			UPLOAD_UPLOADING: 'Uploading',
			UPLOAD_ERROR_DATA: 'File not selected or data not setted.',

			PRODUCT_TYPE_LIVE_ON_TAPE: 'Live on tape',
			PRODUCT_TYPE_B_ROLL: 'B-roll',
			PRODUCT_TYPE_NAT_VO: 'Nat/VO',
			PRODUCT_TYPE_INTERVIEW: 'Interview',
			PRODUCT_TYPE_GRAPHICS: 'Graphics',
			PRODUCT_TYPE_PIECE: 'Piece',
			PRODUCT_TYPE_MOJOMASTERS_COMPETITION: 'Mojo Masters Competition',
			
			BUTTON_READ_ALL: 'Read all',
			BUTTON_READ_LESS: 'Read less',
			BUTTON_EDIT: 'Edit',
			BUTTON_DELETE: 'Delete',

			// Search page
			SHOWING_RESULTS_FOR: 'Showing {{count}} results for',

			// User Gallery page
			USER_GALLERY_USER_VIDEOS: '{{username}} videos',
			USER_GALLERY_USER_NOT_FOUND_TITLE: 'User not found',
			USER_GALLERY_USER_NOT_FOUND_DESCRIPTION: 'We could not find this user. Please, check that link is correct and try again.',

			// Clients
			ADD_CLIENT: 'Add client',
			CLIENT_EMPTY_LIST: 'There are no clients to distribute. First, add one.',
			CLIENT_NAME: 'Name',
			CLIENT_HOST: 'Host',
			CLIENT_USERNAME: 'Username',
			CLIENT_PASSWORD: 'Password',
			CLIENT_SFTP: 'SFTP',
			CLIENT_FOLDER: 'Folder',
			CLIENT_CANCEL: 'Cancel',
			CLIENT_SAVE: 'Save',
			CLIENT_REMOVE_CONFIRM: 'Do you really want to remove this client? This action is permantent.',
			CLIENT_MANDATORY_FIELDS: 'All the fields are mandatory',
			CLIENT_SAVED: 'Client saved!',

			// Distribution
			DISTRIBUTE: 'Distribute',
			DISTRIBUTE_DONE: 'Video distributed',
			VIDEO_NOT_DISTRIBUTED_YET: 'This video have not been distributed yet.',
			SHOW_VIDEO_DISTRIBUTION: 'Show distrbution details',
			HIDE_VIDEO_DISTRIBUTION: 'Hide distrbution details',
			
			TERMS: 'Terms & conditions',

			// Pricing
			PRICING_PAGE_WEB_TITLE: 'Plans - Boost your storytelling with Vimojo',
			PRICING_PAGE_TITLE: 'Several plans and pricing to boost your storytelling',
			PRICING_PAGE_PLAN_CONDITIONS: 'Billed annually, taxes included',
			PRICING_PAGE_SUBSCRIBE_NOW: 'Subscribe now',
			PRICING_PAGE_REGISTER_FREE: 'Register Free',
			PRICING_PAGE_FREE_TRIAL: 'Free Trial',
			PRICING_PAGE_MORE_INFO: '+ More info',
			PRICING_PAGE_FEATURE_TABLE_TITLE: 'Compare all Vimojo suite detailed features',
			PLAN_HEADLINE_WITNESS: 'Occasionally video makers',
			PLAN_HEADLINE_JOURNALIST: 'Journalists and content creators',
			PLAN_HEADLINE_HERO: 'Small media companies',
			PLAN_HEADLINE_SUPER_HERO: 'Large media companies, broadcasters and newsrooms',
			PLAN_FEATURE_RECORD_1080: 'Record FHD videos up to 1080p',
			PLAN_FEATURE_RECORD_4K: 'Record videos up to 4K',
			PLAN_FEATURE_CLOUD_BACKUP_2GB: 'Backup your compositions in the cloud up to 2Gb',
			PLAN_FEATURE_CLOUD_BACKUP_20Gb_SYNC: 'Backup your compositions in the cloud up to 20Gb and sync accross devices',
			PLAN_FEATURE_CLOUD_BACKUP_UNLIMITED_SYNC: 'Unlimited cloud composition backup and sync accross devices',
			PLAN_FEATURE_PRO_EDITOR: 'Pro editor for Android and iOS',
			PLAN_FEATURE_MUSIC_TRACK: 'Add music to your compositions',
			PLAN_FEATURE_SOUND_MULTITRACK: 'Add music and voice over to your compositions',
			PLAN_FEATURE_REMOVE_VIMOJO_BRANDING: 'Removable vimojo branding',
			PLAN_FEATURE_CUSTOM_BRANDING: 'Custom branding',
			PLAN_FEATURE_SUPPORT_EMAIL: 'Email support',
			PLAN_FEATURE_SUPPORT_247: '24/7 email support',
			PLAN_FEATURE_SUPPORT_247_TRAINING: '24/7 email support + online training',
			PLAN_FEATURE_PRO_CAMERA: 'Professional camera',
			PLAN_FEATURE_CONTENT_PLATFORM: 'Content video platform and workflow integration',
			PLAN_FEATURE_COLLABORATIVE_CREATION: 'Collaborative creation support',
			PLAN_FEATURE_ADVANCED_CONTENT_PLATFORM: 'Advanced content platform features',
			FEATURE_NAME_VIDEO_RESOLUTION: 'Max video resolution',
			FEATURE_NAME_LICENSES: 'Licenses',
			FEATURE_NAME_DISTRIBUTION: 'Distribution',
			FEATURE_NAME_CLOUD_STORAGE: 'Cloud Storage',
			FEATURE_NAME_PRO_EDITOR: 'Pro editor Android and iOS',
			FEATURE_NAME_MUSIC_LIBRARY: 'Free music library',
			FEATURE_NAME_REMOVABLE_WATERMARK: 'Removable Watermark',
			FEATURE_NAME_SUPPORT: 'Support',
			FEATURE_NAME_PRO_CAMERA: 'Professional camera',
			FEATURE_NAME_SELECTABLE_FR: 'Selectable Frame Rate',
			FEATURE_NAME_SOUND_MULTITRACK: 'Audio mixer multitrack',
			FEATURE_NAME_SYNC_COMPOSITIONS: 'Sync across devices (iOS/Android)',
			FEATURE_NAME_CUSTOM_BRANDING: 'Custom branding',
			FEATURE_NAME_WORKFLOW_CONNECT: 'Connect with your workflow',
			FEATURE_NAME_SECURITY: 'Security',
			FEATURE_NAME_CONTENT_PLATFORM: 'Content video platform',
			FEATURE_NAME_COLLABORATIVE_EDITING: 'Collaborative editing',
			FEATURE_NAME_ADAPTATIVE_PLAYER: 'Adaptative player',
			FEATURE_NAME_ADVANCED_SEARCH: 'Advanced search for powerful content discovery',
			FEATURE_NAME_VIDEO_TRANSCODING: 'Video transcoding',
			FEATURE_NAME_CV_AI: 'CV/AI video analysis, automatic subtitle/text generation',
			FEATURE_NAME_UGC: 'User Generated Content',
			FEATURE_HINT_VIDEO_RESOLUTION: 'Supported maximum resolution in both record and editing',
			FEATURE_HINT_DISTRIBUTION: 'Sell & Distribute your videos to customers',
			FEATURE_HINT_CLOUD_STORAGE: 'Backup your video files and your video composition in cloud',
			FEATURE_HINT_PRO_EDITOR: 'Lineal multiclip pro editor Android and iOS',
			FEATURE_HINT_REMOVABLE_WATERMARK: 'User can toggle Vimojo watermark',
			FEATURE_HINT_SUPPORT: 'User support and training',
			FEATURE_HINT_PRO_CAMERA: 'Advanced controls in video recording. ISO/WB setting, metering and focus modes, separated metering and focus points, manual focus',
			FEATURE_HINT_SELECTABLE_FR: 'Broadcast quality PAL/NTSC. Selectable FrameRate 25/30/50/60. Depending on device support',
			FEATURE_HINT_SOUND_MULTITRACK: 'Simultaneous support for both music and voice over sound tracks',
			FEATURE_HINT_SYNC_COMPOSITIONS: 'Sync your media and compositions across all your devices',
			FEATURE_HINT_CUSTOM_BRANDING: 'Use your own branding and composition templates (watermark, start and end videos, labels)',
			FEATURE_HINT_WORKFLOW_CONNECT: '(FTP, CDN, CRM, custom connections)',
			FEATURE_HINT_SECURITY: 'Cloud based content platform - content access management',
			FEATURE_HINT_CONTENT_PLATFORM: 'News edition titles/texts, tags, all other info that can be set on. publishing/verifying',
			FEATURE_HINT_COLLABORATIVE_EDITING: 'Team can work simultaneously on a project everywhere',
			FEATURE_HINT_ADVANCED_SEARCH: 'Leverage video editable metadata to improve your content discovery and management',
			FEATURE_HINT_VIDEO_TRANSCODING: 'Downloading your desired format',
			FEATURE_HINT_UGC: 'UGC - Incorporate videos made by your audience/witnesses',
			FEATURE_VALUE_720p: '720p HD',
			FEATURE_VALUE_1080p: '1080p FHD',
			FEATURE_VALUE_4K: '4K Ultra HD',
			FEATURE_VALUE_SINGLE_USER: 'Single user',
			FEATURE_VALUE_TEAM_LICENSE: '*Team (starting 3 users)',
			FEATURE_VALUE_NONE: 'none',
			FEATURE_VALUE_DOWNLOAD_CODES: 'Download codes',
			FEATURE_VALUE_PLUS_FTP: '+ FTP',
			FEATURE_VALUE_PLUS_AUTO: '+ Automatic',
			FEATURE_VALUE_2GB: '2Gb',
			FEATURE_VALUE_20GB: '20Gb',
			FEATURE_VALUE_UNLIMITED: 'Unlimited',
			FEATURE_VALUE_EMAIL: 'email',
			FEATURE_VALUE_247: '24/7',
			FEATURE_VALUE_247_TRAINING: '24/7 + 2h online training',

	});
	}
}());
