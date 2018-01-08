describe('login service', function () {
	beforeEach(angular.mock.module('app'));
	
	var mockApi = null;
	var callback = null;

	// Mock API service
	beforeEach(function () {
		mockApi = {
			post: function (uri, data, cb) {
				setTimeout(function () {
					cb(true, {});
				}, 100);
				return true;
			}
		};

		module(function ($provide) {
			$provide.value('api', mockApi);
		});
	});

	// Prepare the callback spy
	beforeEach(function () {
		callback = jasmine.createSpy('callback');
	});

	beforeEach(inject(function (_login_) {
		login = _login_;
	}));

	it('should exist', function () {
		expect(login).toBeDefined();
	});

	describe('.login()', function () {

		it('should exist', function () {
			expect(login.login).toBeDefined();
		});

		it('should execute callback when login finish', function () {
			login.login(undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
		});
	});

	describe('.pending', function () {
		it('should exist', function () {
			expect(login.pending).toBeDefined();
		});

		it('should be false on start', function () {
			expect(login.pending).toEqual(false);
		});

		it('should turn true on login() send', function () {
			login.login(undefined, undefined, callback);
			expect(login.pending).toEqual(true);
		});

		it('should go back to false on response recieved', function () {
			login.login(undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
			expect(login.pending).toEqual(false);
		});

	});

});