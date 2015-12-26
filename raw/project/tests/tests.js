describe('Test FrontPageController', function(){
	beforeEach(module('testApp'));

	var $controller, $scope, http, messages;

	beforeEach(inject(function(_$controller_, $rootScope, _$httpBackend_) {
		$controller = _$controller_;
		$scope = $rootScope.$new();
		
		http = _$httpBackend_;
		http
		.when('GET', '/api/notification/list')
		.respond([{
			id: 1337,
			from: 'userManagement',
			category: 'info',
			header: 'Password expiration',
			content: 'Your password expires in the next 2 days, please change it using the user management inter face.',
			type: 'note'
		}]);

		// server message emitter
		messages = new NewMessages(http);
		
		// init controller
		$controller('FrontPageController', {$scope: $scope, $http: http, config: {}, messages: messages});
	}));

	it('Add new message.', function() {		
		$scope.application.addNewMessage('a','b','c','d');
		expect($scope.application.data.length).toBe(1);
		expect($scope.application.data[0].content).toBe('b');			
	});

	it('View messages in output row', function() {
		for(var i=0;i<10;i++)
			$scope.application.addNewMessage('a'+i,'b','c','d');

		expect($scope.application.data.length).toBe(10);
		$scope.$digest();
		expect($scope.application.msgList.length).toBe(5);
	});

	it('Get new message from server', function() {
		$scope.application.data = [];
		// messages.start($scope.application.data);
		messages.stop();
		setTimeout(function  () {
			expect($scope.application.data.length).toBe(1);
		}, 100);
	});

});


describe('Test directive "messageWindow"', function(){
	beforeEach(module('testApp'));

	var $scope, scope, http, element;

	beforeEach(inject(function($rootScope, _$httpBackend_, $compile, $templateCache) {
		$scope = $rootScope.$new();		
		http = _$httpBackend_;

		http
		.when('POST', '/api/notification/confirm')
		.respond({});
		$templateCache.put('message.html', '<div>Some html code {{getIcon("info")}}</div>');


		$scope.msg = {
			id: 100,
			from: 'sender',
			category: 'warning',
			header: 'Tests are very important',
			content: 'I need more tests',
			type: 'note'
		};

		element = angular.element('<message-window ng-model="msg"></message-window>');
		$compile(element)($scope);
		$scope.$digest();

		scope = element.isolateScope();
		scope.$apply();

	}));

	it('Get icon test - info', function() {
		expect(scope.getIcon('info')).toBe('info.png');
	});

	it('Get icon test - warning', function() {
		expect(scope.getIcon('warning')).toBe('warn.png');
	});

	it('Get icon test - error', function() {
		expect(scope.getIcon('error')).toBe('error.png');
	});

	it('Close message window',function () {
		scope.closeWindow('close');
		setTimeout(function(){
			expect(scope.msg.status).toBe('accepted');
		}, 100);
	});

	it('Autoclose timeout', function() {
		scope.setCloseTimeout(scope.msg);
		expect(scope.msg.$$countdown).toBeGreaterThan(0);		
	});

	it('Abort autoclose', function() {
		scope.setCloseTimeout(scope.msg);
		scope.clearCloseTimeout(scope.msg)
		expect(scope.msg.$$countdown).toBeUndefined();		
	});
});