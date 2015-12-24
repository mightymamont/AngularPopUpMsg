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
	},

	startData = [
		{category:'info', type:'ok_cancel_confirm', header: '1 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: '2 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'warning', type:'ok_cancel_confirm', header: '3 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'info', type:'ok_cancel_confirm', header: '4 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'error', type:'ok_cancel_confirm', header: '5 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'error', type:'ok_cancel_confirm', header: '6 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
		{category:'error', type:'ok_cancel_confirm', header: '7 Заголовок этого окошечка WWWWWWWWWWWWWWWWWWW', content: 'Содержимое сообщения'},
	];


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
		// removeThisWindow(element[0],290);		
		setTimeout(function() {
			scope.msg.closed = true;
			scope.$apply();
		}, 290);

		callback && callback(type);
	}
}


//// на эти функции надо написать документацию --->

// функция отправления уведомления при закрытии окошка
function sendConfirm (httpService) {
	return function(buttonType) {
		console.log('Пошёл "%s" обработчик...',buttonType);
	}
}

// функция, запускающая удаление заданного окна
function removeThisWindow(label, timeout) {
	setTimeout(function() {
		element.remove();
	}, timeout);
}

// получить список сообщений для вывода
function getMessagesList (msgList) {
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
