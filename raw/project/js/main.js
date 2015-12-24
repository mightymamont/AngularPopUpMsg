/**
	*	@ngdoc object
	*	@name testApp
	*	@description
	*
	*	Application entry point. 
**/
var testApp = angular.module('testApp',[]);

/**
	*	@ngdoc controller
	*	@name testApp.controller.frontPage
	*	@description
	*
	*	Main controller. Application interface handler.
**/
testApp.controller('frontPage',function($scope){
	var app = $scope.application = {};
	
	app.data = [
		{category:'info', type:'ok_cancel_confirm', header: 'Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: 'Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: 'Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: 'Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: 'Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
	];
	app.categories = categories;
	app.buttons = buttons;

	app.ready = true;
});

/**
	*	@ngdoc directive
	*	@name app.directive.messageWindow
	*	@scope Use own scope
	*	@restrict E
	*	@description
	*
	*	Block of message og group box. 
		<pre>
			<message-window ng-model="msg"></message-window>
		</pre>
**/
testApp.directive('messageWindow',function(){
	return {
		restrict: 'E',
		scope:{
			msg:'=ngModel'
		},
		templateUrl: 'message.html',
		link: function(scope, element) {
			scope.getIcon = getIcon;
			scope.closeWindow = closeMsgWindow(element, scope, sendConfirm(null));
		}
	}
});