(function () {
	angular.module('app')
		.factory('api', ['$http', apiService]);

	function apiService($http) {
		var api = {
			url: 'http://localhost:3000',
			token: '',
			download: download,
			get: get,
			post: post,
			del: del,
			setToken: setToken,
		};

		return api;

		function post(url, data, callback) {
			return request('POST', url, data, callback);
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

			return $http(req)
				.then(function (r) {
					onSuccess(r, callback);
				}).catch(function (r) {
					onError(r, callback);
				});
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
			console.log(response);
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
