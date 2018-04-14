// target elements with the "draggable" class
interact('.user.me')
  .draggable({
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
  });

function dragMoveSocket(user) {
    var target = document.getElementById(user.id),
        // keep the dragged position in the data-x/data-y attributes
        x = user.x,
        y = user.y;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  function dragMoveListener (event) {
    const socket = io();
    let user;
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    user = me;
    user.x = x;
    user.y = y;
    socket.emit('dragUser', user);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;