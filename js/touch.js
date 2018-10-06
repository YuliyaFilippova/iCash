function onTouch(el, callback) {

  var touchsurface = el,
    dir,
    swipeType,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, // минимальная дистанция которая будет считаться свайпом
    restraint = 100, // максимальная разрешенная дистанция в другом направлении в это же время
    allowedTime = 500, // максимальное время разрешенное для прохождения дистанций threshold и restraint
    elapsedTime,
    startTime,
    handletouch = callback || function(evt, dir, phase, swipetype, distance) {};

  touchsurface.addEventListener('touchstart', function(e) {
    var touchobj = e.changedTouches[0];
    dir = 'none';
    swipeType = 'none';
    dist = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // записывает время когда палец впервые касается поверхности
    handletouch(e, 'none', 'start', swipeType, 0); // вызов callback функции с параметрами dir="none", phase="start", swipetype="none" и т.д.
    e.preventDefault();

  }, false);

  touchsurface.addEventListener('touchmove', function(e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // получение горизонтальной дистанции, пройденной пальцем с момента начала контакта с поверхностью
    distY = touchobj.pageY - startY; // получение вертикальной дистанции, пройденной пальцем с момента начала контакта с поверхностью
    if (Math.abs(distX) > Math.abs(distY)) { // если дистанция пройденная горизонтально больше чем вертикально, установить что это горизонтальное перемещение
      dir = (distX < 0) ? 'left' : 'right'
      handletouch(e, dir, 'move', swipeType, distX) // вызов callback функции с параметрами dir="left|right", phase="move", swipetype="none" и т.д.
    } else { // иначе установить что это вертикальное перемещение
      dir = (distY < 0) ? 'up' : 'down'
      handletouch(e, dir, 'move', swipeType, distY) // вызов callback функции с параметрами dir="up|down", phase="move", swipetype="none" и т.д.
    };
    e.preventDefault() // исключить стандартное использование скрола извне элемента
  }, false);

  touchsurface.addEventListener('touchend', function(e) {
    var touchobj = e.changedTouches[0]
    elapsedTime = new Date().getTime() - startTime; // получить время, прошеднее с начала свайпа
    if (elapsedTime <= allowedTime) { // первая проверка когда свайпы встретились
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // вторая проверка встречи с горизонтальным свайпом
        swipeType = dir; // установить swipeType на "left" или "right"
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // вторая проверка встречи с вертикальным свайпом
        swipeType = dir; // установить swipeType на "top" или "down"
      };
    };
    // вызов callback функции с параметрами dir="left|right|up|down", phase="end", swipetype=dir и т.д.:
    handletouch(e, dir, 'end', swipeType, (dir == 'left' || dir == 'right') ? distX : distY);
    e.preventDefault();
  }, false);
};

// Использование данной функции:
/*
ontouch(el, function(evt, dir, phase, swipetype, distance){
 // evt: содержит оригинальный объект Event
 // dir: содержит направления свайпа - "none", "left", "right", "top", или "down"
 // phase: содержит фазу действия - "start", "move", или "end"
 // swipetype: содержит тип свайпа -  "none", "left", "right", "top", или "down"
 // distance: пройденная дистанция горизонтальная или вертикальная в зависимости от значения dir
 
 if ( phase == 'move' && (dir =='left' || dir == 'right') )
  console.log('Вы передвигаете пален горизонтально на ' + distance)
})
*/