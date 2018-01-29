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