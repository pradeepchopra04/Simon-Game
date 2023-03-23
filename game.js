var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(started == false) {

        nextSequence();
        started = true;  
    }
     else if(started == true) {
        nextSequence();
    }
});

$(document).ready(function(){
    $(".btn").click(function(){
        
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }); 
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
    
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
            else {
                console.log("Wrong");
                playSound("wrong");

                $("body").addClass("game-Over");

                setTimeout (function(){
                $("body").removeClass("game-Over");
                }, 200);

                $("#level-title").text("Game Over, Press Any Key to Restart");
                startOver();
            }
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
            audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
