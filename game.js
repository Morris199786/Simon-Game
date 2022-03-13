var buttonColours = ["red", "blue", "green", "yellow"];

// used to store the designate color
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


// use keyboard key to start the game
$(document).keypress(function(event) {
  // check if the game has started
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

// detect which button is clicked
// store the buttons that are clicked by the player
$(".btn").click(function() {
  // only there exists a number in gamePattern we start checking
  if (gamePattern.length != 0) {
    // store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    // call checkAnswer after user clicked the color button
    checkAnswer(userClickedPattern.length - 1);
  }

});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("Game: " + gamePattern);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play the sound
  playsound(randomChosenColour);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  // remove the pressed class after 100 miliseconds
  setTimeout(function() {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playsound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, you ended at level " + level);
    setTimeout(function() {
      $("#level-title").html("Press Any Key to Restart")
    }, 2000);
    // call startOver once the user gets wrong
    startOver();
  }
}

// reset the value
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
