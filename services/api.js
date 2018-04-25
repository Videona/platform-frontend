(function () {
	angular.module('app')
		.factory('api', ['$http', 'backendApiUrl', apiService]);

	function apiService($http, backendApiUrl) {
		var api = {
			url: backendApiUrl,
			token: '',
			download: download,
			upload: upload,
			get: get,
			post: post,
			put: put,
			del: del,
			setToken: setToken,
		};

		return api;

		function post(url, data, callback) {
			return request('POST', url, data, callback);
		}

		function put(url, data, callback) {
			if (data.files != undefined && data.files.length > 0) {
				let uploadFiles = data.files;
				delete data.files;
				let req = buildRequestForFileUpload('PUT', url, data);
				uploadFiles.forEach(file => {
					req.data.append(file.name, file.file);
				});
				return performHttpRequest(req, callback);
			} else  {
				return request('PUT', url, data, callback);
			}
		}

		function get(url, callback) {
			return request('GET', url, null, callback);
		}

		function del(url, data, callback) {
			return request('DELETE', url, data, callback);
		}

		function request(type, url, data, callback) {
			var req = {
				method: type,
				headers: {},
				url: url,
			};

			if (api.token !== '') {
				req.headers.authorization = 'Bearer ' + api.token;
			}

			if (type === 'POST' || type === 'DELETE' || type === 'PUT' || type === 'PATCH') {
				req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				req.transformRequest = transformRequest;
				req.data = data;
			}

			return performHttpRequest(req, callback);
		}

		function download(url, callback) {

			var req = {
				method: 'GET',
				headers: {},
				url: url,
				responseType: 'arraybuffer'
			};

			if (api.token !== '') {
				req.headers.authorization = 'Bearer ' + api.token;
			}

			return $http(req)
				.then(function (response) {
					var data = response.data;
					var headers = response.headers();
					var filename = headers['x-filename'];
					var contentType = headers['content-type'];
			 
					var linkElement = document.createElement('a');
					try {
						var blob = new Blob([data], { type: contentType });
						var url = window.URL.createObjectURL(blob);
		
						linkElement.setAttribute('href', url);
						linkElement.setAttribute('download', filename);

						var clickEvent = new MouseEvent('click', {
							'view': window,
							'bubbles': true,
							'cancelable': false
						});
						linkElement.dispatchEvent(clickEvent);
					} catch (ex) {
						console.log(ex);
					}
					onSuccess(response, callback);
				}).catch(function (response) {
					onError(response, callback);
				});
		}

		function upload(url, file, data, callback) {
			if(!url || !file) {
				console.error('API Upload error: file or url was not provided.');
				return false;
			}

			var formData = data;

			if(!callback && typeof data === 'function') {
				callback = data;
				formData = null;
			}

			let req = buildRequestForFileUpload('POST', url, formData);
			req.data.append('file', file);

			return performHttpRequest(req, callback);
		}

		function buildRequestForFileUpload(requestMethod, url, formData) {
			let req = {
				method: requestMethod,
				headers: {'Content-Type': undefined},
				url: url,
				data: new FormData(),
				transformRequest: angular.identity
			};

			if (api.token !== '') {
				req.headers.authorization = 'Bearer ' + api.token;
			}

			for (let param in formData) {
				req.data.append(param, formData[param]);
			}
			return req;
		}

		function performHttpRequest(req, callback) {
			return $http(req)
				.then(function (response) {
					onSuccess(response, callback);
				}).catch(function (response) {
					onError(response, callback);
				});
		}


		function transformRequest(obj) {
			var str = [];
			var keys = Object.keys(obj);
			var values = Object.values(obj);

			for (let i = 0; i <= keys.length; i += 1) {
				str.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(values[i]));
			}

			return str.join('&');
		}

		function onSuccess(response, callback) {
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			if (typeof (callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

		function onError(response, callback) {
			console.error(response);
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			console.error('Error ' + status + ' in HTTP request');

			if (typeof (callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

		function setToken(token) {
			if (typeof (token) !== 'undefined') {
				api.token = token;
			}
		}
	}
}());
