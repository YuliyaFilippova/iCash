// Функция для загрузки данных из LocalStorage
function loadData() {
	if (!localStorage.getItem(appName)) { // получение факта наличия данных в LocalStorage
		localStorage.setItem(appName, JSON.stringify([])); // если данные остуствуют, то создать пустой массив
	};
	allCash = JSON.parse(localStorage.getItem(appName)); // передача JSON данных из LocalStorage в глобальный массив allCash с предварительным форматированием данных
};

// Функция для сохранения данных в LocalStorage
function saveData() {
	localStorage.setItem(appName, JSON.stringify(allCash)); // передача глобального массива allCash в LocalStorage с предварительным форматированием данных в JSON формат 
};