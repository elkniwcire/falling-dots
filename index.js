
var createDotInterval;
var moveDotInterval;
var moveDotSpeed = 50;
var score = 0;

var button = document.querySelector("#play-pause-button");

updateScore(score); //sets inital score value

function updateScore(value){
    var scoreText = document.querySelector("#score");
    scoreText.innerHTML = value; // sets score text to value
}

var slider = document.querySelector("#slider"); //getting slider
updateSpeedText(slider.value); //passing data update display text

function updateSpeedText(value) {
    var speedText = document.querySelector("#speed"); //selecting speed display text
    speedText.innerHTML = value; //setting display text to match value of slider at startup
}

slider.oninput = function() {
    value = this.value;   //getting value of slider on change
    updateSpeedText(value);
    var speed = 101 - value;
    UpdateSpeed(speed);
}

function createDots() {
    createDotInterval = setInterval(createDot, 1000);

    function createDot() {
        var dot = document.createElement("a"); //create element
        dot.className = "dot"; //giving it class dot
        var randomSize = Math.floor((Math.random() * 100) + 10);
        dot.style.height = randomSize + "px";
        dot.style.width = randomSize + "px";
        dot.onclick = function(){dotPressed(101-randomSize, this);};
        var ballContainer = document.querySelector("#ball-container");
        var min = ballContainer.offsetLeft;
        var max = ballContainer.clientWidth - randomSize;
        var randomLeft = Math.floor((Math.random() * max) + min);
        var newPositionLeft = dot.offsetLeft + randomLeft;
        dot.style.left = newPositionLeft + "px";
        ballContainer.appendChild(dot); //adding dot
    }
}

function moveDots(){

    moveDotInterval = setInterval(moveDot, moveDotSpeed);

    function moveDot () {

        var dots = document.querySelectorAll(".dot");
        var i;
        for (i=0; i < dots.length; i++){
            var position = dots[i].offsetTop;
            if (position > window.innerHeight){
                dots[i].parentElement.removeChild(dots[i]);
                console.log("gone");
                /*Removing dot if it goes off screen to save memory and performance*/
            } else {
                position++;
                dots[i].style.top = position + "px";
            }
            
        }
    }
}



function buttonPressed() {

    if (button.value == "play") {
        play();
    } else if (button.value == "pause"){
        pause();
    }

}

function play() {
    createDots();
    moveDots();
    button.value = "pause";
}

function pause() {
    clearInterval(createDotInterval);
    clearInterval(moveDotInterval);
    button.value = "play";
    var dots = document.querySelectorAll(".dot");
    var i;
    for (i = 0; i < dots.length; i++){
        dots[i].disabled = true;
    }
}

function dotPressed(value, thisDot){
    score = score + value;
    updateScore(score);
    thisDot.parentElement.removeChild(thisDot);
}

function UpdateSpeed(speed){
    clearInterval(moveDotInterval);
    moveDotSpeed = speed;
    moveDots(moveDotSpeed);
}