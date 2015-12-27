/**
	*	@ngdoc object
	*	@name testApp
	*	@description
	*
	*	Application entry point. 
**/
var testApp = angular.module('testApp',[]);


/**
	*	@ngdoc object
	*	@name testApp.constant:config
	*	@description
	*
	*	Contains main information for application configuration.
**/
testApp.constant('config', {
	categories: {
		info:'Information message',
		warning: 'Warning message',
		error: 'Error message'
	},

	buttons: {
		note: 'Without buttons',
		ok_confirm: 'Ok button',
		ok_cancel_confirm: 'Ok & cancel buttons'
	}
});

/**
	*	@ngdoc service
	*	@name testApp.factory:getIcon
	*	@returns {string} Icon file name
	*	@description
	*
	*	Actual icon for category id. Work as a function. Return icon file name. For using in direcives.
**/
testApp.factory('getIcon', function() {
	return function(type) {
		var res = 'group.png';
		switch(type) {
			case 'info': res = 'info.png'; break;
			case 'warning': res = 'warn.png'; break;
			case 'error': res = 'error.png'; break;
		}
		return res;
	}
});

/**
	*	@ngdoc service
	*	@name testApp.service:messages
	*	@description
	*
	*	Prompts for new messages from the server.
	*	Use <strong>messages.start(<i>messagesList</i>)</strong> for start server autorequesting; 
	*	messageList - actual list of incoming messages.
**/
testApp.service('messages', NewMessages);

/**
	*	@ngdoc controller
	*	@name testApp.controller:FrontPageController
	*	@description
	*
	*	Main controller. Application interface handler.
**/
testApp.controller('FrontPageController',function($scope, $http, config, messages){
	var app = $scope.application = {};
	app.data = [];
	app.msgList = [];
	app.categories = config.categories;
	app.buttons = config.buttons;

	$scope.$watch('application.data',function(newValue, oldValue){
		app.msgList = getMessagesList($scope)(newValue);
	}, true);

	app.addNewMessage = addNewMessage($scope);

	app.header = 'Demo header';
	app.content = 'Demo content message in two lines';
	app.category = 'info';
	app.button = 'ok_confirm';

	messages.start(app.data);

	// ready to display screen
	app.ready = true;
});
 
/**
	*	@ngdoc directive
	*	@name testApp.directive:messageWindow
	*	@scope Use own scope
	*	@restrict E
	*	@description
	*
	*	Block of message or group box. 
		<pre>
			<message-window ng-model="msg"></message-window>
		</pre>
**/
testApp.directive('messageWindow', function($http, getIcon){
	return {
		restrict: 'E',
		scope:{
			msg:'=ngModel'
		},
		templateUrl: 'message.html',
		link: function(scope, element) {
			scope.getIcon = getIcon;
			scope.closeWindow = closeMsgWindow(element, scope, $http);
			scope.setCloseTimeout = setCloseTimeout(scope, element);
			scope.clearCloseTimeout = clearCloseTimeout(scope, element);
			//start autoclose
			scope.setCloseTimeout(scope.msg);
		}
	}
});