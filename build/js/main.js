function getIcon(type) {
    var res = "group.png";
    switch (type) {
      case "info":
        res = "info.png";
        break;

      case "warning":
        res = "warn.png";
        break;

      case "error":
        res = "error.png";
    }
    return res;
}

function closeMsgWindow(element, scope, callback) {
    return function(type) {
        var elm = element[0].querySelector("group" == scope.msg.type ? ".groupBox" : ".messageBox");
        elm.classList.add("windowCollapse"), closeThisWindow(element[0], 290), callback && callback(type);
    };
}

function sendConfirm(httpService) {
    return function(buttonType) {
        console.log("Пошёл какой-то обработчик...", buttonType);
    };
}

function closeThisWindow(element, timeout) {
    setTimeout(function() {
        element.remove();
    }, timeout);
}

var testApp = angular.module("testApp", []);

testApp.controller("frontPage", function($scope) {
    var app = $scope.application = {};
    app.data = [ {
        category: "info",
        type: "ok_cancel_confirm",
        header: "Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
        content: "Содержимое сообщения"
    }, {
        category: "info",
        type: "ok_cancel_confirm",
        header: "Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
        content: "Содержимое сообщения"
    }, {
        category: "info",
        type: "ok_cancel_confirm",
        header: "Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
        content: "Содержимое сообщения"
    }, {
        category: "info",
        type: "ok_cancel_confirm",
        header: "Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
        content: "Содержимое сообщения"
    }, {
        category: "info",
        type: "ok_cancel_confirm",
        header: "Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
        content: "Содержимое сообщения"
    } ], app.categories = categories, app.buttons = buttons, app.ready = !0;
}), testApp.directive("messageWindow", function() {
    return {
        restrict: "E",
        scope: {
            msg: "=ngModel"
        },
        templateUrl: "message.html",
        link: function(scope, element) {
            scope.getIcon = getIcon, scope.closeWindow = closeMsgWindow(element, scope, sendConfirm(null));
        }
    };
});

var categories = {
    info: "Information message",
    warning: "Warning message",
    error: "Error message"
}, buttons = {
    note: "Without buttons",
    ok_confirm: "Ok button",
    ok_cancel_confirm: "Ok & cancel buttons"
};