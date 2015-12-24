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
        elm.classList.add("windowCollapse"), setTimeout(function() {
            scope.msg.closed = !0, scope.$apply();
        }, 290), callback && callback(type);
    };
}

function sendConfirm(httpService) {
    return function(buttonType) {
        console.log('Пошёл "%s" обработчик...', buttonType);
    };
}

function removeThisWindow(label, timeout) {
    setTimeout(function() {
        element.remove();
    }, timeout);
}

function getMessagesList(msgList) {
    for (var outArray = [], i = msgList.length - 1; i >= 0; i--) msgList[i].closed || outArray.push(msgList[i]);
    if (outArray.length > 5) {
        var cnt = outArray.length - 4;
        outArray = outArray.slice(0, 4), outArray.push({
            type: "group",
            count: cnt
        });
    }
    return outArray;
}

var testApp = angular.module("testApp", []);

testApp.controller("frontPage", function($scope) {
    var app = $scope.application = {};
    app.data = startData, app.categories = categories, app.buttons = buttons, app.msgList = getMessagesList, 
    app.ready = !0;
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
}, startData = [ {
    category: "info",
    type: "ok_cancel_confirm",
    header: "1 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "info",
    type: "ok_cancel_confirm",
    header: "2 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "warning",
    type: "ok_cancel_confirm",
    header: "3 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "info",
    type: "ok_cancel_confirm",
    header: "4 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "error",
    type: "ok_cancel_confirm",
    header: "5 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "error",
    type: "ok_cancel_confirm",
    header: "6 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
}, {
    category: "error",
    type: "ok_cancel_confirm",
    header: "7 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW",
    content: "Содержимое сообщения"
} ];