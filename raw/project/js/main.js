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
	*	@name ap.controller.frontPage
	*	@description
	*
	*	Main controller. Application interface handler.
**/
testApp.controller('frontPage',function($scope){
	var app = $scope.application = {};
	app.ready = true;

	console.log($scope.application);
});


testApp.directive('messageWindow',function(){
	return {
		restrict: 'E',
		scope:{
			msg:'=ngModel'
		},
		templateUrl: 'message.html'
	}
});