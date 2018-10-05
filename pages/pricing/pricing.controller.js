angular.module('app')
	.controller('PricingController', ['$mdToast', '$scope', '$translate', 'page', '$location', '$anchorScroll', PricingController]);

function PricingController($mdToast, $scope, $translate, page, $location, $anchorScroll) {
	var self = this;

	const plans = [
		{
			name: 'Witness',
			productId: 'witness',
			headline: 'PLAN_HEADLINE_WITNESS',
			icon: 'videocam',
			price: 4.79,
			features: [
				{ icon: 'videocam', featureLine: 'PLAN_FEATURE_RECORD_1080' },
				{ icon: 'cloud', featureLine: 'PLAN_FEATURE_CLOUD_BACKUP_2GB' },
				{ icon: 'video_library', featureLine: 'PLAN_FEATURE_PRO_EDITOR' },
				{ icon: 'music_video', featureLine: 'PLAN_FEATURE_MUSIC_TRACK' },
				{ icon: 'branding_watermark', featureLine: 'PLAN_FEATURE_REMOVE_VIMOJO_BRANDING' },
				{ icon: 'question_answer', featureLine: 'PLAN_FEATURE_SUPPORT_EMAIL' },
			]
		},
		{
			name: 'Journalist',
			productId: 'journalist',
			headline: 'PLAN_HEADLINE_JOURNALIST',
			icon: 'mic',
			price: 9.79,
			features: [
				{ icon: 'videocam', featureLine: 'PLAN_FEATURE_RECORD_4K' },
				{ icon: 'cloud', featureLine: 'PLAN_FEATURE_CLOUD_BACKUP_20Gb_SYNC' },
				{ icon: 'video_library', featureLine: 'PLAN_FEATURE_PRO_EDITOR' },
				{ icon: 'music_video', featureLine: 'PLAN_FEATURE_SOUND_MULTITRACK' },
				{ icon: 'branding_watermark', featureLine: 'PLAN_FEATURE_REMOVE_VIMOJO_BRANDING' },
				{ icon: 'question_answer', featureLine: 'PLAN_FEATURE_SUPPORT_247' },
			]
		},
		{
			name: 'Hero',
			headline: 'PLAN_HEADLINE_HERO',
			productId: 'hero',
			icon: 'business',
			price: 84,
			features: [
				{ icon: 'videocam', featureLine: 'PLAN_FEATURE_RECORD_4K' },
				{ icon: 'cloud', featureLine: 'PLAN_FEATURE_CLOUD_BACKUP_UNLIMITED_SYNC' },
				{ icon: 'video_library', featureLine: 'PLAN_FEATURE_PRO_EDITOR' },
				{ icon: 'music_video', featureLine: 'PLAN_FEATURE_SOUND_MULTITRACK' },
				{ icon: 'branding_watermark', featureLine: 'PLAN_FEATURE_CUSTOM_BRANDING' },
				{ icon: 'question_answer', featureLine: 'PLAN_FEATURE_SUPPORT_247_TRAINING' },
				{ icon: 'camera', featureLine: 'PLAN_FEATURE_PRO_CAMERA' },
				{ icon: 'web', featureLine: 'PLAN_FEATURE_CONTENT_PLATFORM' },
			]
		},
		{
			name: 'Super Hero',
			productId: 'superHero',
			headline: 'PLAN_HEADLINE_SUPER_HERO',
			icon: 'rowing',
			price: 149,
			features: [
				{ icon: 'videocam', featureLine: 'PLAN_FEATURE_RECORD_4K' },
				{ icon: 'cloud', featureLine: 'PLAN_FEATURE_CLOUD_BACKUP_UNLIMITED_SYNC' },
				{ icon: 'video_library', featureLine: 'PLAN_FEATURE_PRO_EDITOR' },
				{ icon: 'music_video', featureLine: 'PLAN_FEATURE_SOUND_MULTITRACK' },
				{ icon: 'branding_watermark', featureLine: 'PLAN_FEATURE_CUSTOM_BRANDING' },
				{ icon: 'question_answer', featureLine: 'PLAN_FEATURE_SUPPORT_247_TRAINING' },
				{ icon: 'camera', featureLine: 'PLAN_FEATURE_PRO_CAMERA' },
				{ icon: 'web', featureLine: 'PLAN_FEATURE_CONTENT_PLATFORM' },
				{ icon: 'group_add', featureLine: 'PLAN_FEATURE_COLLABORATIVE_CREATION' },
				{ icon: 'whatshot', featureLine: 'PLAN_FEATURE_ADVANCED_CONTENT_PLATFORM' },
			]
		}
	];

	const featureTable = [
		{ featureName: 'FEATURE_NAME_VIDEO_RESOLUTION',
			featureHint: 'FEATURE_HINT_VIDEO_RESOLUTION',
			featureStatus: { free: { text: 'FEATURE_VALUE_720p' }, witness: { text: 'FEATURE_VALUE_1080p' }, journalist: { text: 'FEATURE_VALUE_4K' }, hero: { text: 'FEATURE_VALUE_4K' }, superHero: { text: 'FEATURE_VALUE_4K' } }
		},
		{ featureName: 'FEATURE_NAME_LICENSES',
			featureStatus: { free: { text: 'FEATURE_VALUE_SINGLE_USER' }, witness: { text: 'FEATURE_VALUE_SINGLE_USER' }, journalist: { text: 'FEATURE_VALUE_SINGLE_USER' }, hero: { text: 'FEATURE_VALUE_SINGLE_USER' }, superHero: { text: 'FEATURE_VALUE_TEAM_LICENSE' } }
		},
		{ featureName: 'FEATURE_NAME_DISTRIBUTION',
			featureHint: 'FEATURE_HINT_DISTRIBUTION',
			featureStatus: { free: { text: 'FEATURE_VALUE_NONE' }, witness: { text: 'FEATURE_VALUE_NONE' }, journalist: { text: 'FEATURE_VALUE_DOWNLOAD_CODES' }, hero: { text: 'FEATURE_VALUE_PLUS_FTP' }, superHero: { text: 'FEATURE_VALUE_PLUS_AUTO' } }
		},
		{ featureName: 'FEATURE_NAME_CLOUD_STORAGE',
			featureHint: 'FEATURE_HINT_CLOUD_STORAGE',
			featureStatus: { free: { text: 'FEATURE_VALUE_NONE' }, witness: { text: 'FEATURE_VALUE_2GB' }, journalist: { text: 'FEATURE_VALUE_20GB' }, hero: { text: 'FEATURE_VALUE_UNLIMITED' }, superHero: { text: 'FEATURE_VALUE_UNLIMITED' } }
		},
		{ featureName: 'FEATURE_NAME_PRO_EDITOR',
			featureHint: 'FEATURE_HINT_PRO_EDITOR',
			featureStatus: { free: { enabled: true }, witness: { enabled: true }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_MUSIC_LIBRARY',
			featureStatus: { free: { enabled: true }, witness: { enabled: true }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_REMOVABLE_WATERMARK',
			featureHint: 'FEATURE_HINT_REMOVABLE_WATERMARK',
			featureStatus: { free: { enabled: false }, witness: { enabled: true }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_SUPPORT',
			featureHint: 'FEATURE_HINT_SUPPORT',
			featureStatus: { free: { text: ''}, witness: { text: 'FEATURE_VALUE_EMAIL' }, journalist: { text: 'FEATURE_VALUE_247' }, hero: { text: 'FEATURE_VALUE_247_TRAINING' }, superHero: { text: 'FEATURE_VALUE_247_TRAINING' } }
		},
		{ featureName: 'FEATURE_NAME_PRO_CAMERA',
			featureHint: 'FEATURE_HINT_PRO_CAMERA',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_SELECTABLE_FR',
			featureHint: 'FEATURE_HINT_SELECTABLE_FR',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_SOUND_MULTITRACK',
			featureHint: 'FEATURE_HINT_SOUND_MULTITRACK',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_SYNC_COMPOSITIONS',
			featureHint: 'FEATURE_HINT_SYNC_COMPOSITIONS',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: true }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_CUSTOM_BRANDING',
			featureHint: 'FEATURE_HINT_CUSTOM_BRANDING',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: false }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_WORKFLOW_CONNECT',
			featureHint: 'FEATURE_HINT_WORKFLOW_CONNECT',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: false }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_SECURITY',
			featureHint: 'FEATURE_HINT_SECURITY',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: false }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_CONTENT_PLATFORM',
			featureHint: 'FEATURE_HINT_CONTENT_PLATFORM',
			featureStatus: { free: { enabled: false }, witness: { enabled: false }, journalist: { enabled: false }, hero: { enabled: true }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_COLLABORATIVE_EDITING',
			featureHint: 'FEATURE_HINT_COLLABORATIVE_EDITING',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_ADAPTATIVE_PLAYER',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_ADVANCED_SEARCH',
			featureHint: 'FEATURE_HINT_ADVANCED_SEARCH',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_VIDEO_TRANSCODING',
			featureHint: 'FEATURE_HINT_VIDEO_TRANSCODING',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_CV_AI',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
		{ featureName: 'FEATURE_NAME_UGC',
			featureHint: 'FEATURE_HINT_UGC',
			featureStatus: { free: { enabled: false }, witness: { enabled: false  }, journalist: { enabled: false }, hero: { enabled: false }, superHero: { enabled: true } }
		},
	];

	let selectedPlan;
	self.plans = plans;
	self.featureTable = featureTable;
	self.featureTableProducts = [ 'free', 'witness', 'journalist', 'hero', 'superHero' ];

	// selfish Methods
	self.expandPlanInfo = function (plan) {
		console.log("request more info of plan ", plan);
		selectedPlan = plan;
		// TODO(jliarte): 4/10/18 register user event into event tracker
		$location.hash('feature-table-comparison');
		$anchorScroll.yOffset = 20;
		$anchorScroll();
	};

	self.buttonClassForPlanPlan = function (productId) {
		if (productId === 'hero') {
			return 'md-primary';
		}
	};

	self.buyProduct = function (productId) {
		// TODO(jliarte): 4/10/18 track event
		console.log("user product purchase ", productId);
		// TODO(jliarte): 4/10/18 redirect to register page
	}

	// self.update = function (isValidForm) {
	// 	closeSelectFields();
	// 	if (!isValidForm) {
	// 		return showMessage($translate.instant('VIDEO_EDIT_MSG_INVALID_FORM'));
	// 	}
	// 	self.actionsDisabled = true;
	// 	sanitizeVideoFields();
	// 	console.log("video to update is ", self.video);
	// 	self.videoService.update(self.video).then( result => {
	// 		showMessage($translate.instant('VIDEO_EDIT_MSG_VIDEO_UPDATED'));
	// 		$state.go('videoDetail', {id: self.id});
	// 		// resetForm();
	// 		// self.videoService.reset();
	// 		getVideo();
	// 	}).catch( error => {
	// 		console.log("error in request ", error);
	// 		showMessage($translate.instant('VIDEO_EDIT_MSG_ERROR_UPDATING_VIDEO'));
	// 		resetForm();
	// 	});
	// };

	// init
	// initSelectMaps();
	// getVideo();
	// initGMaps();

	// function showMessage(message) {
	// 	let toastParentElement = angular.element(document.getElementById("toast-container"));
	// 	$mdToast.show(
	// 		$mdToast.simple()
	// 			.textContent(message)
	// 			.parent(toastParentElement)
	// 			.toastClass("mojofy-toast")
	// 			.position("fixed-top right")
	// 	);
	// }

}
