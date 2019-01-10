
var createDotInterval;
var moveDotInterval;
var moveDotIntervalSpeed = 10;
var score = 0;
var isPlaying = false;

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
    var speed = this.value;   //getting value of slider on change
    updateSpeedText(speed); //updating global moveDotIntervalSpeed and display
    var intervalSpeed = 110 - speed; //reversing value. Higher speed = shorter interval
    UpdateSpeed(intervalSpeed); //passing new interval
}

function createDots() {

    createDotInterval = setInterval(createDot, 1000); //creates new dot every 1 second

    function createDot() {

        /*This function creates a new dot and adds it to the ball-container element*/

        var dot = document.createElement("a"); //create dot element
        dot.className = "dot"; //giving it class dot
        var randomSize = Math.floor((Math.random() * 100) + 10); //size between 10 - 100
        dot.style.top = (0 - randomSize) + "px"; //positioning off screen by height
        dot.style.height = randomSize + "px"; //assiging height
        dot.style.width = randomSize + "px"; // assigning width
        
        /*This function runs on click and passes size as a value for score tracking*/
        dot.onclick = function(){dotPressed(randomSize, this);};

        /*finding size of ball container and positioning random distance
        * from left*/
        var ballContainer = document.querySelector("#ball-container"); //getting element
        var min = ballContainer.offsetLeft; //min left position is far left of container
        var max = ballContainer.clientWidth - randomSize; //max left is width - width of dot
        var randomLeft = Math.floor((Math.random() * max) + min); //generating random number between ranges
        var newPositionLeft = dot.offsetLeft + randomLeft; //new absolute position is random + far left of container
        dot.style.left = newPositionLeft + "px"; //updating dot position

        ballContainer.appendChild(dot); //adding dot to ball-container
    }
}

function moveDots(){

    moveDotInterval = setInterval(moveDot, moveDotIntervalSpeed); //runs moveDot() every interval

    function moveDot () {

        /* This function moves all dots by one pixel per interval.
        * Shorter intervals mean faster movements */

        var dots = document.querySelectorAll(".dot"); //getting all dots
        var i;

        /* Running this for each dot via loop */
        for (i=0; i < dots.length; i++){
            var position = dots[i].offsetTop; //get current position from top
            if (position > window.innerHeight){
                /*Removing dot if it goes off screen to save memory and performance*/
                dots[i].parentElement.removeChild(dots[i]);
            } else {
                /*if the dot is still on screen then it moves by 1 pixel */
                position++;
                dots[i].style.top = position + "px";
            }
            
        }
    }
}



function buttonPressed() {

    /* checking value of button and either running play() or pause() functions */

    if (button.value == "play") {
        play();
    } else if (button.value == "pause"){
        pause();
    }

}

function play() {
    createDots(); //starts creating dots every 1 sec
    moveDots(); //moves all dots according to interval
    isPlaying = true; //setting this boolean to track if game is running or paused
    button.value = "pause"; //switching button to say 'paused'
}

function pause() {
    clearInterval(createDotInterval); //stops new dot creation
    clearInterval(moveDotInterval); //stops movement of all dots
    isPlaying = false; //boolean set to false to disable score and other elements when paused
    button.value = "play"; //switching button to play
}

function dotPressed(value, thisDot){
    
    /* The actions that happen when a dot it pressed.
     *  this is different if game is paused or play  */

    if (isPlaying == true){
        //if true then update score
        var calculatedScore = (11 - Math.round(value/10)); //calculating score. Bigger dots = smaller score
        score = score + calculatedScore; //adding to total
        updateScore(score); //updating
        thisDot.classList.add("puff-out-center"); //adding css class for animation
    } else if (isPlaying == false) {
        //do nothing
    }
    
}

function UpdateSpeed(intervalSpeed){
    /* updating intervalSpeed when passed from slider
    * smaller number = faster interval */
    moveDotIntervalSpeed = intervalSpeed;//updating global variable
    if (isPlaying == true) {
        //if game is playing then restart moveDots() function
        clearInterval(moveDotInterval); //clearing old interval
        moveDotIntervalSpeed = intervalSpeed; //setting to new interval
        moveDots(moveDotIntervalSpeed); //passing new interval
    } else if (isPlaying == false) {
        //do nothing
    }

}