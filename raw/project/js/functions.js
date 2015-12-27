// config variables
var msgUrl = '/api/notification/list',
	answerUrl = '/api/notification/confirm',
	requestInterval = 10000,
	closeWindowDelay = 290,
	autocloseTimeout = 90000;

////////////////////////////
// CONTROLLER
////////////////////////////

// add new message to list
function addNewMessage(scope) {
	return function (header, body, category, button) {
		scope.application.data.push({id:-1, category: category, type: button, header: header, content: body, from: 0});
	}
}

// Get messages from server
function NewMessages($http) {
	var timer, messageArray;

	function getMessages() {
		$http.get(msgUrl).then(
			function (answer) {
				messageArray.concat(answer.data)
			},
			function (error) {
				console.log(error);
				console.error('Invalid URL or server troubles.',error.data || 'Request failed.');
			}
		);
	}

	this.start = function(msgArray) {
		messageArray = msgArray;
		if(timer) {
			console.info('timer already started');
			return;
		}
		timer = setInterval(function(){ getMessages(); }, requestInterval);
	}

	this.stop = function() {
		clearInterval(timer);
		timer = 0;
	}
}

////////////////////////////
// DIRECTIVE
////////////////////////////

/**
	*	@ngdoc function
	*	@name closeMsgWindow
	*	@param {element} element Directive parent element
	*	@param {object} scope Directive's current scope
	*	@param {service} HTTP-service for getting messages and sending of replies
	*	@returns {function} Click handler function
	*	@description
	*
	*	Close message window. Window may be closed by clicking "close", "ok" or "cancel" buttons. Ok-button and Cancel-button have handlers.
**/
function closeMsgWindow(element, scope, service) {
	return function(type) {		
		if(!scope.msg)
			return;
		var selector = scope.msg.type == 'group' ? '.groupBox' : '.messageBox',
			elm = element[0].querySelector(selector);
		elm && elm.classList.add('windowCollapse');
		setTimeout(function() {
			scope.msg.closed = true;
			if(scope.msg.$$countdown)
				clearTimeout(scope.msg.$$countdown);
			scope.$apply();
		}, closeWindowDelay);

		service && sendConfirm(service)(type, scope.msg);
	}
}

// функция отправления уведомления при закрытии окошка
function sendConfirm (service) {
	return function(buttonType, msg) {
		var answerData = {
			id: msg.id,
			from: msg.from,
			result: buttonType == 'ok_confirm' ? 1 : 0 
		};
		
		service.post(answerUrl, answerData).then(
			function(answer) {
				msg.status = 'accepted';
				console.info('Answer accepted');
			},
			function(answer) {
				msg.status = 'failed';
				console.error('Request rejected' || answer.data);
			}
		);
	}
}

// получить список сообщений для вывода
function getMessagesList (scope, element) {
	return function (msgList) {
		var outArray = [];
		for(var i = msgList.length-1; i>=0;i--) {
			if(!msgList[i].closed)
				outArray.push(msgList[i]);
		}

		if(outArray.length > 5) {
			var cnt = outArray.length - 4;
			outArray = outArray.slice(0,4);
			outArray.push({type:'group', count: cnt});
		}
		return outArray;
	}
}

// установить обратный отсчёт закрытия
function setCloseTimeout(scope, element) {
	return function(elt) {
		if(!elt.$$countdown) {
			elt.$$countdown = setTimeout(function(){
				closeMsgWindow(element, scope)('autoclose');
			}, autocloseTimeout);
		}
	}
}

// отменить обратный отсчёт закрытия
function clearCloseTimeout (scope) {
	return function(elt) {
		if(elt.$$countdown) {
			clearTimeout(elt.$$countdown);
			delete elt.$$countdown;
		}
	}
}