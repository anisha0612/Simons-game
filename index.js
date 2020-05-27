const colors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
// let game = {
//   colors: ["red", "blue", "green", "yellow"],
//   gamePattern: [],
//   userClickedPattern: [],
//   level: 0,
// };

//start Over
const startOver = () => {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
};

// generate random colors
const randomColors = () => {
  userClickedPattern = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);
  animateColor(randomColor);
  playSound(randomColor);
  level += 1;
  $("h1").text(`Level : ${level}`);
};

// animate color
const animateColor = (color) => {
  $("." + color)
    .fadeOut(150)
    .fadeIn(150);
};

//play sound for color
const playSound = (color) => {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
};

const compareUserClicks = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        randomColors();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text(`Game Over! Press A key to continue...`);
    startOver();
  }
};

//user click
$(".color").on("click", function () {
  let userClicked = $(this).attr("id");
  userClickedPattern.push(userClicked);
  animateColor(userClicked);
  playSound(userClicked);
  compareUserClicks(userClickedPattern.length - 1);
});

function reset() {
  randomColors();
  $("h1").text(`Level : ${level}`);
}

//  start game with keypress 'A'

$(document).on("keydown", function (event) {
  if (event.keyCode === 65) {
    reset();
  }
});

// // restart the game on key press
// $(document).on("keydown", function () {
//   startOver();
//   reset();
// });
