// Функция для проверки значения в input-те наименования
function checkName() {
	var val = cashNameInput.value;
	var exr = /[a-zA-Z\d]+/g; // паттерн для проверки наименования регулярным выражением
	if (exr.test(val)) { // проверка регулярным выражением по заданному паттерну
		cashName = val;
		return true;
	} else {
		// вызов всплывающего окна при ошибке правильности ввода
		var cashNameNotification = new Notification(appName, { // объявление нового всплывающего окна с тегом cashNameNotifications
			tag: "cashNameNotifications", // тег всплывающего окна
			body: "Данные в строке 'Наименование' введены не по формату. Допускаются буквы и цифры." // текст сообщения
		});
		console.log("Данные в строке 'Наименование' введены не по формату. Допускаются буквы и цифры."); // лог сообщения всплывающего окна в консоль
		return false;
	};
};

// Функция для проверки значения в input-те цены
function checkValue() {
	var val = cashValueInput.value;
	var exr = /\d+/g; // паттерн для проверки цены регулярным выражением
	if (exr.test(val)) { // проверка регулярным выражением по заданному паттерну
		cashValue = parseInt(val);
		return true;
	} else {
		// вызов всплывающего окна при ошибке правильности ввода
		var cashValueNotification = new Notification(appName, { // объявление нового всплывающего окна с тегом cashValueNotifications
			tag: "cashValueNotifications", // тег всплывающего окна
			body: "Данные в строке 'Цена' введены не по формату. Допускаются только цифры." // текст сообщения
		});
		console.log("Данные в строке 'Цена' введены не по формату. Допускаются только цифры."); // лог сообщения всплывающего окна в консоль
		return false;
	};
};

// Функция для проверки значения в input-те даты
function checkDate() {
	var val = cashDateInput.value;
	var exr = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/gm; // паттерн для проверки даты регулярным выражением
	if (exr.test(val)) { // проверка регулярным выражением по заданному паттерну
		cashDate = val;
		return true;
	} else {
		// вызов всплывающего окна при ошибке правильности ввода
		var cashDateNotification = new Notification(appName, { // объявление нового всплывающего окна с тегом cashDateNotifications
			tag: "cashDateNotifications", // тег всплывающего окна
			body: "Данные в строке 'Дата' введены не по формату. Допускается ввод цифрового значения даты по формату  ДД.ММ.ГГГГ или Д.М.ГГ.(можно использовать другие символы для разделения даты)" // текст сообщения
		});
		console.log("Данные в строке 'Дата' введены не по формату. Допускается ввод цифрового значения даты по формату  ДД.ММ.ГГГГ или Д.М.ГГ.(можно использовать другие символы для разделения даты)"); // лог сообщения всплывающего окна в консоль
		return false;
	};
};

// общая функция проверки input-ов
function checkInput() {
	if (checkName()) {
		if (checkValue()) {
			if (checkDate()) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	};
};

// Функция для передачи новых данных в LocalStorage и их дальнейшей прорисовки
function addCash() {
	if (checkInput()) { // проверка input-ов
		allCash.push({ // передача данных в глобальный массив
			cashName: cashName,
			cash: cashValue,
			date: cashDate,
			id: getUuid()
		});
		calculateCash(); // подсчет и прорисовка суммы(итого)
		saveData(); // сохранение данных в LocalStorage
		// обнуление значений в input-ах
		cashValueInput.value = '';
		cashNameInput.value = '';
		cashDateInput.value = '';
		toggleVisibility('addNewCash'); // скрыть форму для добавления новых наименований
		drawRemoveCash(); // прорисовать удаление всех элементов
		drawAddCash(); // прорисовать все элементы из LocalStorage
	} else {
		// вызов всплывающего окна при ошибке правильности ввода
		var addCashNameNotification = new Notification(appName, { // объявление нового всплывающего окна с тегом addCashNameNotifications
			tag: "addCashNameNotifications", // тег всплывающего окна
			body: "Заполните строки по формату" // текст сообщения
		});
		console.log("Заполните строки по формату"); // лог сообщения всплывающего окна в консоль
	};
};

// Функция для подсчета и прорисовки суммы(итого)
function calculateCash() {
	var totalCashTd = document.getElementById('totalCashTd'); // определить td для записи данных
	totalCash = 0; // обнулить значение суммы(итого)
	if (allCash.length) { // если в общем массиве содержаться элементы, то просчитать сумму циклом
		allCash.forEach(function(element, index, array) {
			totalCash += parseInt(element.cash);
		});
		totalCashTd.innerHTML = totalCash; // прорисовать данные 
		return true;
	} else { // в ином случае написать сумму равной 0 и прорисовать данные
		totalCashTd.innerHTML = totalCash;
		return false;
	};
};

// Функция для прорисовки новых данных
function drawAddCash() {
	if (allCash.length) { // если в общем массиве содержаться элементы, то начать прорисовку
		allCash.forEach(function(element) {
			// прорисовка элементов циклом по заданному шаблону
			document.getElementById('allCashBody').insertAdjacentHTML("beforeEnd", '<tr draggable="true" id="tr_' + element.id + '"><td id="name_' + element.id + '">' + element.cashName + '</td><td id="value_' + element.id + '">' + element.cash + '</td><td id="date_' + element.id + '">' + element.date + '</td><td><span class="close-icon" id="span_' + element.id + '">-</span></td></tr>');
			addHandlersAndRemove(element.id); // добавить обработчики событий
		});
		return true;
	} else {
		return false;
	};

};

// Функция для прорисовки удаление всех данных
function drawRemoveCash() {
	if (allCash.length) { // если в общем массиве содержаться элементы, то начать прорисовку удаления
		allCash.forEach(function(element) { // удалить элементы благодаря циклу
			if (document.getElementById('tr_' + element.id)) {
				document.getElementById('tr_' + element.id).parentNode.removeChild(document.getElementById('tr_' + element.id));
			};
			return true;
		});
	} else {
		return false;
	};

};

// Функция для проверки нажатия клавиши Enter и передачи данных из input-ов
function keyPressHandler(event) {
	if (event.keyCode === ENTER_KEY) { // проверка нажатия клавиши Enter по коду
		addCash(); // выполнение функции для передачи данных
		return true;
	} else {
		return false;
	};
};

// Функция добавления обработчиков событий для создаваемых элементов
function addHandlersAndRemove(id) {
	document.getElementById('span_' + id).onclick = function() {
		document.getElementById('tr_' + id).parentNode.removeChild(document.getElementById('tr_' + id)); //удалить элемент из DOM модели
		allCash.forEach(function(element, index, array) {
			if (element.id == id) {
				allCash.splice(index, 1) // удалить элемент из общего массива
			};
		});
		saveData(); // сохранить данные в LocalStorage
		calculateCash(); // подсчет и прорисовка суммы(итого)
	};

	// Установить обработчики событий для редактирования элемента после двойного клика
	document.getElementById('name_' + id).addEventListener('dblclick', editCash, false);
	document.getElementById('value_' + id).addEventListener('dblclick', editCash, false);
	document.getElementById('date_' + id).addEventListener('dblclick', editCash, false);

	// Установить обработчики события для Drag'n'drop событий
	document.getElementById('tr_' + id).addEventListener('dragstart', handleDragStart, false);
	document.getElementById('tr_' + id).addEventListener('dragover', handleDragOver, false);
	document.getElementById('tr_' + id).addEventListener('drop', handleDrop, false);
	document.getElementById('tr_' + id).addEventListener('dragend', handleDragEnd, false);

	// Установить обработчики событий для тач событий
	onTouch(document.getElementById('tr_' + id), function(evt, dir, phase, swipetype, distance) {
		if (phase == 'end') { // действие при окончании тача
			if (swipetype == 'right') { // если свайп успешно завершен вправо
				allCash.forEach(function(element, index, array) {
					if (('tr_' + element.id) == evt.target.parentNode.id) {
						allCash.splice(index, 1) // удалить элемент из общего массива
					};
				});
				evt.target.parentNode.remove(); //удалить элемент из DOM модели
				saveData(); // сохранить данные в LocalStorage
				calculateCash(); // подсчет и прорисовка суммы(итого)
			}
		}
	}) // конец функции onTouch
};

// Функция для редактирования данных
function editCash(evt) {
	var pattern = /\d\w\S+/gm; // паттерн для проверки даты регулярным выражением
	var id = evt.target.id.match(pattern)[0]; // присвоение переменной id знаения target.id с помощью регулярных выражений

	// записать значения прорисованных данных в глобальные переменные
	cashDate = document.getElementById('date_' + id).innerHTML;
	cashName = document.getElementById('name_' + id).innerHTML;
	cashValue = document.getElementById('value_' + id).innerHTML;

	// записать значения глобальных переменных в значения всех input-ов
	cashDateInput.value = cashDate;
	cashNameInput.value = cashName;
	cashValueInput.value = cashValue;

	// удалить редактируемый элемент из глобального массива
	allCash.forEach(function(element, index, array) {
		if (element.id == id) {
			allCash.splice(index, 1)
		};
	});
	calculateCash(); // подсчет и прорисовка суммы(итого)
	toggleVisibility('addNewCash'); // скрыть форму для добавления новых наименований
	document.getElementById('tr_' + id).innerHTML = '<tr id="addNewCash"><td><input type="text"  placeholder="Наименование" spellcheck="true" id="cashName"></td><td><input type="text"  placeholder="Цена" id="cashValue"></td><td><input type="text" placeholder="ДД.ММ.ГГГГ или Д.М.ГГ" id="cashDate"></td><td><span id="addCash">Добавить</span></td></tr>';
	document.getElementById('tr_' + id).parentNode.removeChild(document.getElementById('tr_' + id));
};

// Функция для изменения отображения элемента (скрыть/показать)
function toggleVisibility(idName) {
	if (document.getElementById(idName).style.display == 'none') { // проверка скрыт ли объект
		document.getElementById(idName).style.display = ''; // изменить значение на стандартное
	} else {
		document.getElementById(idName).style.display = 'none'; // в ином случае скрыть объект
	};
};

//Функция для генерирования уникального ID
function getUuid() {
	var i, random,
		uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		};
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	};
	return uuid;
};

// Функция для обновления ориентации экрана
function updateOrientation() {
	event.preventDefault(); // остановить стандартное выполнение
	var orientation = window.orientation; // получить значение ориентации экрана
	switch (orientation) {
		case 90:
		case -90:
			orientation = 'landscape'; // изменить ориентацию на ландшафтную
			break;
		default:
			orientation = 'portrait'; // портретная ориентация по умолчанию
	};
};