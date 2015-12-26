function addNewMessage(scope) {
    return function(header, body, category, button) {
        scope.application.data.push({
            id: -1,
            category: category,
            type: button,
            header: header,
            content: body,
            from: 0
        });
    };
}

function NewMessages($http) {
    function getMessages() {
        $http.get(msgUrl).then(function(answer) {
            messageArray.concat(answer.data);
        }, function(error) {
            console.error("Invalid URL or server troubles.", error.data || "Request failed.");
        });
    }
    var timer, messageArray;
    this.start = function(msgArray) {
        return messageArray = msgArray, timer ? void console.info("timer already started") : void (timer = setInterval(function() {
            getMessages();
        }, requestInterval));
    }, this.stop = function() {
        clearInterval(timer), timer = 0;
    };
}

function closeMsgWindow(element, scope, service) {
    return function(type) {
        if (scope.msg) {
            var selector = "group" == scope.msg.type ? ".groupBox" : ".messageBox", elm = element[0].querySelector(selector);
            elm && elm.classList.add("windowCollapse"), setTimeout(function() {
                scope.msg.closed = !0, scope.msg.$$countdown && clearTimeout(scope.msg.$$countdown), 
                scope.$apply();
            }, closeWindowDelay), service && sendConfirm(service)(type, scope.msg);
        }
    };
}

function sendConfirm(service) {
    return function(buttonType, msg) {
        var answerData = {
            id: msg.id,
            from: msg.from,
            result: "ok_confirm" == buttonType ? 1 : 0
        };
        service.post(answerUrl, answerData).then(function(answer) {
            msg.status = "accepted", console.info("Answer accepted");
        }, function(answer) {
            msg.status = "failed", console.error("Request rejected");
        });
    };
}

function getMessagesList(scope, element) {
    return function(msgList) {
        for (var outArray = [], i = msgList.length - 1; i >= 0; i--) msgList[i].closed || outArray.push(msgList[i]);
        if (outArray.length > 5) {
            var cnt = outArray.length - 4;
            outArray = outArray.slice(0, 4), outArray.push({
                type: "group",
                count: cnt
            });
        }
        return outArray;
    };
}

function setCloseTimeout(scope, element) {
    return function(elt) {
        elt.$$countdown || (elt.$$countdown = setTimeout(function() {
            closeMsgWindow(element, scope)("autoclose");
        }, autocloseTimeout));
    };
}

function clearCloseTimeout(scope) {
    return function(elt) {
        elt.$$countdown && (clearTimeout(elt.$$countdown), delete elt.$$countdown);
    };
}

var msgUrl = "/api/notification/list", answerUrl = "/api/notification/confirm", requestInterval = 1e4, closeWindowDelay = 290, autocloseTimeout = 9e4, testApp = angular.module("testApp", []);

testApp.constant("config", {
    categories: {
        info: "Information message",
        warning: "Warning message",
        error: "Error message"
    },
    buttons: {
        note: "Without buttons",
        ok_confirm: "Ok button",
        ok_cancel_confirm: "Ok & cancel buttons"
    }
}), testApp.factory("getIcon", function() {
    return function(type) {
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
    };
}), testApp.service("messages", NewMessages), testApp.controller("FrontPageController", function($scope, $http, config, messages) {
    var app = $scope.application = {};
    app.data = [], app.msgList = [], app.categories = config.categories, app.buttons = config.buttons, 
    $scope.$watch("application.data", function(newValue, oldValue) {
        app.msgList = getMessagesList($scope)(newValue);
    }, !0), app.addNewMessage = addNewMessage($scope), app.header = "Demo header", app.content = "Demo content message in two lines", 
    app.category = "info", app.button = "ok_confirm", messages.start(app.data), app.ready = !0;
}), testApp.directive("messageWindow", function($http, getIcon) {
    return {
        restrict: "E",
        scope: {
            msg: "=ngModel"
        },
        templateUrl: "message.html",
        link: function(scope, element) {
            scope.getIcon = getIcon, scope.closeWindow = closeMsgWindow(element, scope, $http), 
            scope.setCloseTimeout = setCloseTimeout(scope, element), scope.clearCloseTimeout = clearCloseTimeout(scope, element), 
            scope.setCloseTimeout(scope.msg);
        }
    };
});