// Global jasmine utils
// Becouse of how Jasmine works, there are some utils that can only be 
// initialized one time, or it will fail. To avoid failures, we initialize 
// that kind of things here.

// Jasmine clock
jasmine.clock().install();

describe('LoginController', function() {
	beforeEach(module('app'));

	var $controller;

	var _USER = 'user';	// Expected user
	var _PASS = 'pass'; // Expected pass

	var LoginServiceMock = {
		login: function(user, pass, cb) {
			setTimeout(function() {
				if(user === _USER && pass === _PASS) {
					cb(true);
				} else {
					cb(false);
				}
			}, 100);
		}
	};

	var $state = {
		go: null
	};


	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('.submit()', function() {
		var controller;

		beforeEach(function() {
			// LoginController(login, session, $state, $stateParams, $translate)
			controller = $controller('LoginController', {});
		});

		it('Shall not be loading on init', function() {
			expect(controller.loading).toEqual(false);
		});

		it('Shall start loading on submit', function() {
			controller.username = _USER;
			controller.password = _PASS;
			controller.submit();
			
			expect(controller.loading).toEqual(true);
		});

		it('Shall reset errors on submit', function() {
			controller.username = _USER;
			controller.password = _PASS;
			controller.submit();
			
			expect(controller.error).toEqual(null);
		});

		it('Shall not start loading if user or pass are not defined', function() {
			controller.submit();
			
			expect(controller.loading).toEqual(false);
		});

		it('Shall show an error if user or pass are not defined', function() {
			controller.submit();
			
			expect(controller.error).not.toEqual(null);
		});
	});

	describe('[internal] done()', function() {
		var controller;

		beforeEach(function() {
			// LoginController(login, session, $state, $stateParams, $translate)
			controller = $controller('LoginController', {login: LoginServiceMock, $state: $state});
			$state.go = jasmine.createSpy('$state.go');
		});

		it('Shall stop loading on success (or fail)', function() {
			controller.username = _USER;
			controller.password = _PASS;
			controller.submit();

			expect(controller.loading).toEqual(true);

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect(controller.loading).toEqual(false);
		});

		it('Shall fire $state.go() on successfull login', function() {
			controller.username = _USER;
			controller.password = _PASS;
			controller.submit();

			expect($state.go).not.toHaveBeenCalled();

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect($state.go).toHaveBeenCalled();
		});

		it('Shall NOT fire $state.go() on worg login', function() {
			controller.username = _USER + 'wrong';
			controller.password = _PASS + 'wrong';
			controller.submit();

			expect($state.go).not.toHaveBeenCalled();

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect($state.go).not.toHaveBeenCalled();
		});

		it('Shall show an error on worg login', function() {
			controller.username = _USER + 'wrong';
			controller.password = _PASS + 'wrong';
			controller.submit();

			expect(controller.error).toEqual(null);

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect(controller.error).not.toEqual(null);
		});

	});

});
describe('login service', function() {
	beforeEach(angular.mock.module('app'));
	
	var mockApi = null;
	var callback = null;

	// Mock API service
	beforeEach(function() {
		mockApi = {
			post: function (uri, data, cb) {
				setTimeout(function() {
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
	beforeEach(function() {
		callback = jasmine.createSpy('callback');
	});

	beforeEach(inject(function(_login_) {
		login = _login_;
	}));

	it('should exist', function() {
		expect(login).toBeDefined();
	});

	describe('.login()', function() {

		it('should exist', function() {
			expect(login.login).toBeDefined();
		});

		it('should execute callback when login finish', function() {
			login.login(undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
		});
	});

	describe('.pending', function() {
		it('should exist', function() {
			expect(login.pending).toBeDefined();
		});

		it('should be false on start', function() {
			expect(login.pending).toEqual(false);
		});

		it('should turn true on login() send', function() {
			login.login(undefined, undefined, callback);
			expect(login.pending).toEqual(true);
		});

		it('should go back to false on response recieved', function() {
			login.login(undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
			expect(login.pending).toEqual(false);
		});

	});

});
describe('RegisterController', function() {
	beforeEach(module('app'));

	var $controller;

	var _USER = 'user';		// Expected user
	var _EMAIL = 'email';	// Expected email
	var _PASS = 'pass'; 	// Expected pass
	var loginSpy = function() {};

	var LoginServiceMock = {
		login: function(user, pass, cb) {
			loginSpy();
			setTimeout(function() {
				if(user === _USER && pass === _PASS) {
					cb(true);
				} else {
					cb(false);
				}
			}, 100);
		}
	};

	var RegisterServiceMock = {
		register: function(user, email, pass, cb) {
			setTimeout(function() {
				if(user === _USER && email === _EMAIL && pass === _PASS) {
					cb(true);
				} else {
					cb(false);
				}
			}, 100);
		}
	};

	var $state = {
		go: null
	};


	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('.submit()', function() {
		var controller;

		beforeEach(function() {
			// RegisterController(register, login, session, $state, $stateParams, $translate)
			controller = $controller('RegisterController', {register: RegisterServiceMock, login: LoginServiceMock, $state: $state});
		});

		it('Shall not be loading on init', function() {
			expect(controller.loading).toEqual(false);
		});

		it('Shall start loading on submit', function() {
			controller.username = _USER;
			controller.email = _EMAIL;
			controller.password = _PASS;
			controller.submit();
			
			expect(controller.loading).toEqual(true);
		});

		it('Shall reset errors on submit', function() {
			controller.username = _USER;
			controller.email = _EMAIL;
			controller.password = _PASS;
			controller.submit();
			
			expect(controller.error).toEqual(null);
		});

		it('Shall not start loading if user or pass are not defined', function() {
			controller.submit();
			
			expect(controller.loading).toEqual(false);
		});

		it('Shall show an error if user or pass are not defined', function() {
			controller.submit();
			
			expect(controller.error).not.toEqual(null);
		});
	});

	describe('[internal] done()', function() {
		var controller;

		beforeEach(function() {
			// RegisterController(login, session, $state, $stateParams, $translate)
			controller = $controller('RegisterController', {register: RegisterServiceMock, login: LoginServiceMock, $state: $state});
			loginSpy = jasmine.createSpy('Login.login');
			$state.go = jasmine.createSpy('$state.go');
		});

		it('Shall stop loading on register server failure', function() {
			controller.username = _USER + 'wrong';
			controller.email = _EMAIL + 'wrong';
			controller.password = _PASS + 'wrong';
			controller.submit();

			expect(controller.loading).toEqual(true);

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect(controller.loading).toEqual(false);
		});

		it('Shall try to login on server success', function() {
			controller.username = _USER;
			controller.email = _EMAIL;
			controller.password = _PASS;
			controller.submit();

			expect(loginSpy).not.toHaveBeenCalled();

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect(loginSpy).toHaveBeenCalled();
		});

		it('Shall stop loading on success (or fail)', function() {
			controller.username = _USER;
			controller.email = _EMAIL;
			controller.password = _PASS;
			controller.submit();

			expect(controller.loading).toEqual(true);

			// wait fot it...
			jasmine.clock().tick(201);
			
			expect(controller.loading).toEqual(false);
		});

		it('Shall fire $state.go() on successful register and login', function() {
			controller.username = _USER;
			controller.email = _EMAIL;
			controller.password = _PASS;
			controller.submit();

			expect($state.go).not.toHaveBeenCalled();

			// wait fot it...
			jasmine.clock().tick(201);
			
			expect($state.go).toHaveBeenCalled();
		});

		it('Shall NOT fire $state.go() on worg login', function() {
			controller.username = _USER + 'wrong';
			controller.email = _EMAIL + 'wrong';
			controller.password = _PASS + 'wrong';
			controller.submit();

			expect($state.go).not.toHaveBeenCalled();

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect($state.go).not.toHaveBeenCalled();
		});

		it('Shall show an error on worg login', function() {
			controller.username = _USER + 'wrong';
			controller.email = _EMAIL + 'wrong';
			controller.password = _PASS + 'wrong';
			controller.submit();

			expect(controller.error).toEqual(null);

			// wait fot it...
			jasmine.clock().tick(101);
			
			expect(controller.error).not.toEqual(null);
		});

	});

});
describe('Register service', function() {
	beforeEach(angular.mock.module('app'));
	
	var mockApi = null;
	var callback = null;

	// Mock API service
	beforeEach(function() {
		mockApi = {
			post: function (uri, data, cb) {
				setTimeout(function() {
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
	beforeEach(function() {
		callback = jasmine.createSpy('callback');
	});

	beforeEach(inject(function(_register_) {
		register = _register_;
	}));

	it('should exist', function() {
		expect(register).toBeDefined();
	});

	describe('.register()', function() {

		it('should exist', function() {
			expect(register.register).toBeDefined();
		});

		it('should execute callback when register finish', function() {
			register.register(undefined, undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
		});
	});

	describe('.pending', function() {
		it('should exist', function() {
			expect(register.pending).toBeDefined();
		});

		it('should be false on start', function() {
			expect(register.pending).toEqual(false);
		});

		it('should turn true on register() send', function() {
			register.register(undefined, undefined, undefined, callback);
			expect(register.pending).toEqual(true);
		});

		it('should go back to false on response recieved', function() {
			register.register(undefined, undefined, undefined, callback);
			expect(callback).not.toHaveBeenCalled();
			// wait for it...
			jasmine.clock().tick(101);
			expect(callback).toHaveBeenCalled();
			expect(register.pending).toEqual(false);
		});

	});

});