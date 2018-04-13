angular.module('app')
	.controller('VideoDetailEditController', ['$stateParams', '$mdConstant', 'session', 'video', 'maxVideoUploadByteSize',
		'$state', '$mdToast', 'NgMap', '$scope', '$translate', VideoDetailEditController]);

function VideoDetailEditController($stateParams, $mdConstant, session, video, maxVideoUploadByteSize,
                                   $state, $mdToast, NgMap, $scope, $translate) {
	var self = this;
	const INITIAL_MAP_ZOOM = 6;

	self.session = session;
	self.videoService = video;
	self.id = $stateParams.id;
	self.loading = true;
	self.actionsDisabled = true;
	self.maxVideoUploadSize = maxVideoUploadByteSize / 1000;
	self.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

	// selfish Methods
	self.resetVideoPoster = function () {
		self.newPoster = undefined;
	};

	self.resetVideoFile = function () {
		self.newFile = undefined;
	};

	self.placeChanged = function() {
		self.place = this.getPlace();
		setLocation({name: self.place.name, latLng: self.place.geometry.location});
		centerMap(self.place.geometry.location);
	};

	function setLocation(selectedLocation) {
		if (selectedLocation) {
			self.video.locationName = selectedLocation.name;
			self.marker = { position: [selectedLocation.latLng.lat(), selectedLocation.latLng.lng()], name: selectedLocation.name};
		} else {
			delete self.marker;
			delete self.video.locationName;
		}
	}

	self.mapClick = function ($event) {
		self.geocoder = new google.maps.Geocoder();
		self.geocoder.geocode({ 'latLng': $event.latLng }, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				let address_parts = [];
				address_parts = address_parts.concat(results[0].address_components.filter(addr => (addr.types[0]=='locality')));
				address_parts = address_parts.concat(results[0].address_components.filter(addr => (addr.types[0]=='country')));
				setLocation({name: address_parts.map(item => item.long_name).join(", "), latLng: $event.latLng});
			} else {
				setLocation({name: '', latLng: $event.latLng});
			}
			$scope.$apply();
		});
	};

	self.update = function (isValidForm) {
		if (!isValidForm) {
			return showMessage($translate.instant('VIDEO_EDIT_MSG_INVALID_FORM'));
		}
		self.actionsDisabled = true;
		sanitizeVideoFields();
		console.log("video to update is ", self.video);
		self.videoService.update(self.video).then( result => {
			showMessage($translate.instant('VIDEO_EDIT_MSG_VIDEO_UPDATED'));
			resetForm();
			self.videoService.reset();
			getVideo();
		}).catch( error => {
			console.log("error in request ", error);
			showMessage($translate.instant('VIDEO_EDIT_MSG_ERROR_UPDATING_VIDEO'));
			resetForm();
		});
	};

	self.delete = function () {
		console.log("calling delete video action");
	};

	// init
	initSelectMaps();
	getVideo();
	initGMaps();

	// Private selfish methods
	function showMessage(message) {
		let toastParentElement = angular.element(document.getElementById("toast-container"));
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.parent(toastParentElement)
				.toastClass("mojofy-toast")
				.position("fixed-top right")
		);
	}

	function initGMaps() {
		NgMap.getMap().then(function (map) {
			self.map = map;
			if (self.video && self.video.location) {
				centerMap(new google.maps.LatLng(self.video.location));
				self.map.setZoom(INITIAL_MAP_ZOOM);
			}
		});
		self.placeTypes = ['(cities)', '(regions)'];
		self.placeLang = session.currentLang;
	}

	function sanitizeVideoFields() {
		self.video.tag = self.tags.join(",");
		self.video.productType = self.productType.join(",");
		self.video.files = [];
		if (self.newPoster) {
			self.video.files.push({name: 'newPoster', file: self.newPoster});
		}
		if (self.newFile) {
			self.video.files.push({name: 'newFile', file: self.newFile});
		}
		self.video.categories = self.category.join(",");
		self.video.id = self.id;
		if (self.marker) {
			self.video.location = JSON.stringify({lat: self.marker.position[0], lng: self.marker.position[1]});
		}
	}

	function resetForm() {
		self.actionsDisabled = false;
		self.resetVideoFile();
		self.resetVideoPoster();
	}

	function checkEditAccess(video) {
		if (video !== undefined && video.owner == self.session.id) {
			if (self.session.role === 'editor') {
				self.editorRole = true;
			}
			console.log("User is allowed to edit this video");
		} else {
			// TODO(jliarte): should show an error instead of redirecting?
			$state.go("videoPreview", {id: self.id});
		}
	}

	function initSelectMaps() {
		self.videoService.getVideoLangs().then(langs => self.langs = langs );
		self.videoService.getProductTypes().then(productTypes => self.productTypes = productTypes );
		self.videoService.getVideoCategories().then(videoCategories => self.categories = videoCategories );
	}

	function centerMap(latLng) {
		console.log("centering map in ", latLng);
		console.log("map is ", self.map);
		if (self.map) {
			self.map.setCenter(latLng);
		}
	}

	function initVideoFields() {
		if (self.video.date == {}) {
			delete self.video.date;
		}
		self.video.quality = self.video.quality || 0;
		self.video.credibility = self.video.credibility || 0;
		self.video.priceStd = self.video.priceStd || 0;
		self.video.priceCountry = self.video.priceCountry || 0;
		self.video.priceContinent = self.video.priceContinent || 0;
		self.video.priceWorld = self.video.priceWorld || 0;
		self.tags = [];
		self.productType = [];
		self.category = [];
		if (self.video.tag) {
			self.tags = self.video.tag.trim().split(',').filter(item => item);
		}
		if (self.video.productType) {
			self.productType = self.video.productType.trim().split(',').filter(item => item);
		}
		if (self.video.categories) {
			self.category = self.video.categories.trim().split(',').filter(item => item);
		}
		self.video.title = self.video.title || '';
		self.video.description = self.video.description || '';
		self.video.notes = self.video.notes || '';
		self.video.locationName = self.video.locationName || '';
		if (self.video.location) {
			setLocation({name: self.video.locationName, latLng: new google.maps.LatLng(self.video.location) });
		}
	}

	function getVideo() {
		if (self.videoService && self.videoService.data && self.videoService.data.id !== self.id) {
			self.videoService.reset();
		}

		self.videoService.get(self.id, function () {
			self.video = self.videoService.data;
			console.log("retrieved video is ", self.video);
			checkEditAccess(self.video);
			initVideoFields();
			self.loading = false;
			self.actionsDisabled = false;
		});
	}

}
