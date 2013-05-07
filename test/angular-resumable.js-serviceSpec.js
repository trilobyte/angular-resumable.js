describe('service spec', function() {
	var provider,
		factory,
		instance;

	// prepare/cleanup context
	beforeEach(module('resumable.js-services'));
	beforeEach(function(){
		module(function(resumableJsFactoryProvider) {
			provider = resumableJsFactoryProvider;
		});
		inject(function(resumableJsFactory) {
			factory = resumableJsFactory;
		});
	});
	afterEach(function(){
		clearGlobalOptions();
	});

	// test injection
	it('provider service should be injected', function() {
		expect(provider).toBeDefined();
	});
	it('resumableJsFactory service should be injected', function(){
		expect(factory).toBeDefined();
	});

	// test with global options
	describe('Given global option', function() {
		var useWithGlobalOptions = function(global, opts) {
			beforeEach(function(){
				setGlobalOptions(global);
				createInstance(opts);
			});
		};

		describe('target: /', function() {
			useWithGlobalOptions({target: '/'}, {});

			it('the instance should have equal target', function() {
				expect(instance.opts.target).toBe('/');
			});
		});

		describe('target: /test', function() {
			useWithGlobalOptions({target: '/test'}, {});

			it('the instance should have equal target', function() {
				expect(instance.opts.target).toBe('/test');
			});
		});
	});

	// helpers
	var setGlobalOptions = function(opts) {
		provider.options(opts);
	};
	var clearGlobalOptions = function() {
		provider.options({});
	};
	var createInstance = function(opts) {
		instance = factory.create(opts);
		expect(instance).toBeDefined();
	};
});