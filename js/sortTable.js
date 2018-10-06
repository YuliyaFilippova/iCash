function sortGrid(colNum, type, grid) {
	var tbody = grid.getElementsByTagName('tbody')[0]; // присвоить переменной tbody значение первого tbody в элементе grid

	// Составить массив из TR
	var rowsArray = [];
	for (var i = 0; i < tbody.children.length; i++) {
		rowsArray.push(tbody.children[i]);
	};

	// определить функцию сравнения, в зависимости от типа
	var compare;
	switch (type) {
		case 'number':
			compare = function(rowA, rowB) {
				return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
			};
			break;
		case 'string':
			compare = function(rowA, rowB) {
				return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
			};
			break;
	};

	// сортировать
	rowsArray.sort(compare);

	// Убрать tbody из большого DOM документа для лучшей производительности
	grid.removeChild(tbody);


	/* Убрать TR из TBODY.
	Присваивание tbody.innerHTML = '' не работает в IE. 
	на самом деле без этих строк можно обойтись! 
	при добавлении appendChild все узлы будут сами перемещены на правильное место!
	*/
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	};

	// добавить результат в нужном порядке в TBODY
	for (var i = 0; i < rowsArray.length; i++) {
		tbody.appendChild(rowsArray[i]);
	};

	grid.appendChild(tbody);

};