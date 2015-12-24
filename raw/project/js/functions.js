// interface select lists
var categories = {
		info:'Information message',
		warning: 'Warning message',
		error: 'Error message'
	},

	buttons = {
		note: 'Without buttons',
		ok_confirm: 'Ok button',
		ok_cancel_confirm: 'Ok & cancel buttons'
	};


/**
	*	@ngdoc function
	*	@name getIcon
	*	@params {string} type Category name
	*	@returns {string} Reference to file of icon
	*	
	*	@description
	*
	*	Actual icon for category id.
**/
function getIcon(type) {
	var res = 'group.png';
	switch(type) {
		case 'info': res = 'info.png'; break;
		case 'warning': res = 'warn.png'; break;
		case 'error': res = 'error.png'; break;
	}
	return res;
}

/**
	*	@ngdoc function
	*	@name closeMsgWindow
	*	@param {element} element Directive parent element
	*	@param {object} scope Directive's current scope
	*	@param {function} callback Callback function (optional). Have <strong>buttonType</strong> as parametr.
	*	@returns {function} Click handler function
	*	@description
	*
	*	Close message window. Window may be closed by clicking "close", "ok" or "cancel" buttons. Ok-button and Cancel-button have handlers.
**/

function closeMsgWindow(element, scope, callback) {
	return function(type) {
		var elm = element[0].querySelector(scope.msg.type == 'group' ? '.groupBox' : '.messageBox');
		elm.classList.add('windowCollapse');
		// elm.parentElement.classList.add('flattenWnd');
		closeThisWindow(element[0],290);

		callback && callback(type);
	}
}


//// на эти функции надо написать документацию --->

// функция отправления уведомления при закрытии окошка
function sendConfirm (httpService) {
	return function(buttonType) {
		console.log('Пошёл какой-то обработчик...',buttonType);
	}
}

// функция, запускающая закрытие заданного окна
function closeThisWindow(element, timeout) {
	setTimeout(function() {
		element.remove();
	}, timeout);
}
