
var createDotInterval;
var moveDotInterval;

function createDots() {
    createDotInterval = setInterval(createDot, 1000);
}

function moveDots(speed){

    moveDotInterval = setInterval(moveDot, speed);

    function moveDot () {

        var dots = document.getElementsByClassName("dot");
        var i;
        for (i=0; i < dots.length; i++){
            var position = dots[i].offsetTop;
            position++;
            dots[i].style.top = position + 'px';
        }
    }
}

function createDot() {
    var dot = document.createElement("a"); //create element
    dot.className = "dot"; //giving it class dot
    var randomSize = Math.floor((Math.random() * 100) + 10);
    dot.style.height = randomSize + 'px';
    dot.style.width = randomSize + 'px';
    var ballContainer = document.getElementById("ball-container");
    var min = ballContainer.offsetLeft;
    var max = ballContainer.clientWidth - randomSize;
    var randomLeft = Math.floor((Math.random() * max) + min);
    var newPositionLeft = dot.offsetLeft + randomLeft;
    dot.style.left = newPositionLeft + 'px';
    var element = document.getElementById("ball-container"); // finding ball container
    element.appendChild(dot); //adding dot
/*     var dots = document.getElementsByClassName("dot");
    var thisDot = dots[dots.length - 1];
    moveDot(thisDot); */
}

/* function moveDot(dot) {
    var position = dot.offsetTop;

        var id = setInterval(frame, 10);
        function frame() {
            if (position == 1000) {
              clearInterval(id);
            } else {
              position++; 
              dot.style.top = position + 'px';
            }
          }
} */

/* function moveDots() {
    var dots = document.getElementsByClassName("dot");
    var i;
    for (i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var position = dot.offsetTop;

        var id = setInterval(frame, 10);
        function frame() {
            if (position == 350) {
                clearInterval(id);
            } else {
              position++; 
              dot.style.top = position + 'px';
            }
          }

    }
} */

function play() {
    createDots();
    moveDots(10);
}

function pause() {
    clearInterval(createDotInterval);
    clearInterval(moveDotInterval);
}

/* function moveDot(dot) {
    
    var position = dot.offsetTop;
    
    if (position == 500) {
      clearInterval(id);
    } else {
      position = position + 1;
      console.log(dot.offsetTop);
      dot.style.top = position + 'px';
    }
  } 

function dotDrop() {
    createDot(); //create dot

    var dots = document.getElementsByClassName("dot"); //putting all dots into array
    var i; // counter
    for (i = 0; i < dots.length; i++) {

        var dot = dots[i];

        var id = setInterval(moveDot.bind(null,dot),10);
    }
  } */