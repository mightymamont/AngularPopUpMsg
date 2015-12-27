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
/**
	*	@ngdoc function
	*	@name testApp.private:NewMessages
	*	@param {service} $http HTTP-service
	*	@returns {object} Server request object
	*	@description
	*
	*	Source object constructor for <strong>messages</strong> service with same functional.
**/
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
	*	@ngdoc service
	*	@name testApp.private:closeMsgWindow
	*	@param {element} element Directive parent element
	*	@param {object} scope Directive's current scope
	*	@param {service} $http HTTP-service for getting messages and sending of replies
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

/**
	*	@ngdoc service
	*	@name testApp.private:sendConfirm
	*	@param {service} $http HTTP-service for getting messages and sending of replies
	*	@returns {function} Answer config function
	*	@description
	*
	*	Sending confirmation to the server (ok or cancel). 
**/
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

/**
	*	@ngdoc service
	*	@name testApp.private:getMessagesList
	*	@param {scope} scope direcive's scope
	*	@param {element} element Directive parent element
	*	@returns {function} Function of preparing with actual message list as argument.
	*	@description
	*
	*	Prepare actual list of messages for output.
**/
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

/**
	*	@ngdoc service
	*	@name testApp.private:setCloseTimeout
	*	@param {scope} direcive's scope
	*	@param {element} element Directive parent element
	*	@returns {function} Function for using in directive's scope.
	*	@description
	*
	*	Autoclose current message window by timeout. 
**/
function setCloseTimeout(scope, element) {
	return function(elt) {
		if(!elt.$$countdown) {
			elt.$$countdown = setTimeout(function(){
				closeMsgWindow(element, scope)('autoclose');
			}, autocloseTimeout);
		}
	}
}

/**
	*	@ngdoc service
	*	@name testApp.private:clearCloseTimeout
	*	@param {scope} direcive's scope
	*	@returns {function} Function for using in directive's scope.
	*	@description
	*
	*	Abort autoclose timeout. 
**/
function clearCloseTimeout (scope) {
	return function(elt) {
		if(elt.$$countdown) {
			clearTimeout(elt.$$countdown);
			delete elt.$$countdown;
		}
	}
}