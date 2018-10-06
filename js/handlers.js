// Обработчик клика на кнопку передачи новых данных, при нажатии выполняется функция addCash()
addCashTr.addEventListener('click', addCash, false);

// Обработчики событий изменения всех input-ов, при изменении выполняется функция checkName(), либо checkValue(), либо checkDate() - в зависимости от объекта изменения
cashNameInput.addEventListener('change', checkName, false);
cashValueInput.addEventListener('change', checkValue, false);
cashDateInput.addEventListener('change', checkDate, false);

// Обработчик клика для кнопки скрыть/показать поле ввода новых данных
document.getElementById('showAddUI').onclick = function() {
	toggleVisibility('addNewCash'); // скрыть либо показать поле ввода новых данных
	return true;
};

// Обработчик кликов для главного приложения
document.getElementById('iCashApp').onclick = function(e) {
	var target = e && e.target || window.event.srcElement; // определение элемента по которому произошел клик
	if (target.tagName != 'TH') return; 
	var grid = document.getElementById('iCashApp'); // объявление общей переменной содержащей всю таблицу
	sortGrid(target.cellIndex, target.getAttribute('data-type'), grid); // функция для сортировки таблицы по клику на заголовке таблицы
	return true;
};

// Обработчики событий нажатия клавиши Enter для всех input-ов, при нажатии выполняется функция keyPressHandler()
cashDateInput.addEventListener('keypress', keyPressHandler, false);
cashValueInput.addEventListener('keypress', keyPressHandler, false);
cashNameInput.addEventListener('keypress', keyPressHandler, false);

// Исключение стандартного действия для события touchmove
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

// Выполнение функции updateOrientation при изменении ориентации окна
window.addEventListener('orientationchange', updateOrientation, false);