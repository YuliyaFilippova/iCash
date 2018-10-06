// Функция для начала Drag event
function handleDragStart(evt) {
  this.style.opacity = '0.8'; // изменение стиля: opacity = '0.8'
  dragSrcEl = this; // присвоить глобальной переменной dragSrcEl значение перетаскиваемого элемента
  document.body.style.cursor = 'pointer'; // изменить стиль курсора на pointer
  evt.dataTransfer.effectAllowed = 'move'; // установить эффект при Drag event стилем move
  evt.dataTransfer.setData('text/html', this.innerHTML); // записать перетаскиваемый элемент в временный массив dataTransfer у Drag event
  return true;
};

// Функция для момента выхода элемента из родителя при Drag event
function handleDragOver(evt) {
  if (evt.preventDefault) {
    evt.preventDefault(); // остановить стандартное выполнение при Drag event
  };
  evt.dataTransfer.dropEffect = 'move'; // установить эффект при Drag event стилем move
};

// Функция при Drop event
function handleDrop(evt) {
  if (dragSrcEl != this) { // проверка на Drop элемента в своего родителя
    // замена элементов местами: глобальной переменной dragSrcEl и из временного массива dataTransfer у Drag event
    dragSrcEl.innerHTML = this.innerHTML; 
    this.innerHTML = evt.dataTransfer.getData('text/html');
    return true;
  };
};

// Функция для конца Drag event
function handleDragEnd(evt) {
  // удалить родителя для Drag event после окончания Drag event
  [].forEach.call(evt.target, function(element) {
    element.classList.remove('over');
  });
  this.style.opacity = '1'; // вернуть значение стиля: opacity = '1'
  document.body.style.cursor = ''; // установить стиль курсора на стандартное значение
};