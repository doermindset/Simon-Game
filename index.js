$("document").ready(function(){

    const colors = ["red", "green", "blue", "yellow"];

    let pattern = [];
    let userPattern = [];
    let flag = true;
    let level = 0;

    $(".btn").on("click", function() {
        let playerButtonColor = $(this).attr("id");
        userPattern.push(playerButtonColor);

        soundButton(playerButtonColor);
        animatePress(playerButtonColor);
        checkAnswer(userPattern.length-1);
    })

    function checkAnswer(currentLevel) {

        if(pattern[currentLevel] === userPattern[currentLevel]) {
            console.log("success");
            if(pattern.length === userPattern.length) {
                setTimeout(function() {
                    game(currentLevel);
                }, 1000);
            }
        }
        else {
            console.log("wrong");
            soundButton("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    function startOver() {
        level = 0;
        pattern = [];
        userPattern = [];
        flag = true;
    }

    // get a random number from 1 to 4
    function getRandom() {
        return colors[Math.floor(Math.random() * 4)];
    }

    //animate the button 
    function animateButton(color) {
        $("#" + color).fadeOut(100).fadeIn(100);
    }

    //animate the button when it is pressed
    function animatePress(color) {
        $("#" + color).addClass("pressed");
        setTimeout(function(){
            $("#" + color).removeClass("pressed");
        }, 100);
    }
    //make a sound specific to the button
    function soundButton(color) {
        let audio = new Audio("sounds/" +color+".mp3");
        audio.play();
    }


    function game(level) {
        userPattern = [];
        level++;
        $("#level-title").text("Level " + level);

        let randomButton = getRandom();
        pattern.push(randomButton);
        animateButton(randomButton);
        soundButton(randomButton);
        console.log(pattern);
    }


    $("body").on("keydown", function () {
        if(flag) {
            game(level);
            flag = false;
        }
    });


});

