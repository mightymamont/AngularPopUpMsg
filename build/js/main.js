var testApp = angular.module("testApp", []);

testApp.controller("frontPage", function($scope) {
    $scope.application = {};
}), testApp.directive("messageWindow", function() {
    return {
        restrict: "E",
        scope: {
            msg: "=ngModel"
        },
        templateUrl: "message.html"
    };
});