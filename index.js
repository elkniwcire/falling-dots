function ballDrop() {
    var elem = document.getElementById("dot");   
    var pos = -20;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == window.innerHeight) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px';  
      }
    }
  }