(function () {
	angular.module('app')
		.factory('api', ['$http', 'mojofyApiUrl', apiService]);

	function apiService($http, mojofyApiUrl) {
		var api = {
            url: mojofyApiUrl,
			token: '',
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
