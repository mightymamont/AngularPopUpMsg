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

	it('Add few messages', function() {
		for(var i=0;i<10;i++)
			$scope.application.addNewMessage('a'+i,'b','c','d');

		expect($scope.application.data.length).toBe(10);
		$scope.$digest();
		expect($scope.application.msgList.length).toBe(5);
	});

	it('Get new message from server', function() {
		$scope.application.data = [];
		messages.start($scope.application.data);
		messages.stop();
		setTimeout(function  () {
			expect($scope.application.data.length).toBe(1);
		}, 100);
	});

});
