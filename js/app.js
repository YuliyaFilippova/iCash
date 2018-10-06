// Глобальные переменные и объекты
var totalCash = 0, // глобальная переменная для общей суммы(итого)
	cashName = '', // глобальная переменная для наименования
	cashValue = 0, // глобальная переменная для цены
	cashDate = '', // глобальная переменная для даты
	addCashTr = document.getElementById('addCash'), // tr с формой для добавления
	cashNameInput = document.getElementById('cashName'), // input для ввода наименования
	cashValueInput = document.getElementById('cashValue'), // input для ввода значения цены
	cashDateInput = document.getElementById('cashDate'), // input для ввода даты
	dragSrcEl = null, // объект для хранения элемента при Drag'n'Drop событии
	ENTER_KEY = 13, // код клавиши Enter
	appName = 'iCashApp', // глобальное название приложения
	allCash = []; // глобальный массив для загрузки и выгрузки из LocalStorage

// Функция для выполнения кода после загрузки страницы
window.onload = function() {

	// Проверка браузера на вывод функций всплывающих окон
	function newMessage(permission) {
		/* 
		Получение запроса на вывод всплывающих окон.
		Если разрешение не получено, то вернуть значение false.
		В ином случае вывести всплывающее окно с информацией о разрешении и вернуть значени true. 
		*/
		if (permission != "granted") { // 
			return false;
		} else {
			var notify = new Notification(appName, { // объявление нового всплывающего окна с тегом notificationGranted
				tag: "notificationGranted", // тег всплывающего окна
				body: "Всплывающие окна разрешены на данном сайте." // текст сообщения
			});
			return true; 
		};
	};

	// Конец проверки браузера на вывод функций всплывающих окон

	// Главное приложение

	// Конструктор для объекта Cash
	function Cash(cashName, cash, date) {
		this.cashName = cashName; // наименование
		this.cash = cash; // цена
		this.date = date; // дата
		this.id = getUuid(); // уникальный ID, генерируемый специальной функцией
	};

	// Функция для инициализации приложения
	function loadApp() {
		loadData(); // загрузка данных из LocalStorage
		drawUI(); // прорисовка UI
		return true; // возвращение true если функция успешно выполнилась
	};

	// Функция для прорисовка UI
	function drawUI() {
		drawAddCash(); // прорисовка всех наименований
		calculateCash(); // подсчет и прорисовка суммы(итого)
		toggleVisibility('addNewCash'); // скрыть форму для добавления новых наименований
		return true;
	};

	// Инициализация приложения
	loadApp();

	// Конец главного приложения
};