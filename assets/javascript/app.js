// first catagory
var catAnimals = [
    {
        q: ["what is the only animal that can not jump?",
            "The Elephant",
            { a: "The Elephant" },
            { a: "The Mosquito" },
            { a: "The Fish" },
            { a: "The White Man" },
            "./assets/images/Animals/Elephant.gif"]
    },

    {
        q: ["How long does it take a sloth to digest its food?",
            "Two Weeks",
            { a: "Three Days" },
            { a: "One Year" },
            { a: "Two Weeks" },
            { a: "One Hour" },
            "./assets/images/Animals/Sloth.gif"]
    },

    {
        q: ["What Animal has no vocal chords?",
            "The Giraffe",
            { a: "The Fox" },
            { a: "The Giraffe" },
            { a: "The Sperm Whale" },
            { a: "The Common Field Mouse" },
            "./assets/images/Animals/Giraffe.gif"]
    },

    {
        q: ["What is the lifespan of a housefly?",
            "2 weeks",
            { a: "6 days" },
            { a: "1 year" },
            { a: "24 hours" },
            { a: "2 weeks" },
            "./assets/images/Animals/Fly.gif"]
    },

    {
        q: ["What color is hippopotamus milk?",
            "Pink",
            { a: "Blue" },
            { a: "White" },
            { a: "Pink" },
            { a: "Black" },
            "./assets/images/Animals/Hippopotamus.gif"]
    },

    {
        q: ["What is a group of owls is called?",
            "A parliament",
            { a: "A conspiracy" },
            { a: "A flock" },
            { a: "A parliament" },
            { a: "A huddle" },
            "./assets/images/Animals/Owl.gif"]
    },

    {
        q: ["How many taste buds do pigs have?",
            "15,000",
            { a: "7,000" },
            { a: "15,000" },
            { a: "1,000" },
            { a: "350" },
            "./assets/images/Animals/Pig.gif"]
    },

    {
        q: ["How many Hearts does an octopus have?",
            "3",
            { a: "6" },
            { a: "1" },
            { a: "3" },
            { a: "4" },
            "./assets/images/Animals/Octopus.gif"]
    },

    {
        q: ["How many ants are there per human on earth?",
            "1,000",
            { a: "1,000" },
            { a: "1,000,000" },
            { a: "250" },
            { a: "5,000" },
            "./assets/images/Animals/Ants.gif"]
    },

    {
        q: ["What color skin do polar bears have?",
            "Black",
            { a: "White" },
            { a: "Blue" },
            { a: "Black" },
            { a: "Pink" },
            "./assets/images/Animals/Polar_Bear.gif"]
    },
];

// general vars 
var correct = 0;
var incorrect = 0;
var width = 100;
var time = 10;
var qNum = 0;

// empty strings/arrays
var a = "";
var b = "";
var img = "";

$(document).ready(gameStart);

function gameStart() {
    // general vars 
    correct = 0;
    incorrect = 0;
    width = 100;
    time = 10;
    qNum = 0;

    // empty strings/arrays
    a = "";
    b = "";
    img = "";

    console.log("ready!");
    $("#main_body").empty();

    // Creating the divs
    var catDiv = $("<div id='innerBody'>");

    var barDiv = $("<div id='bar_wrapper'>");
    var insideBarDiv = $("<div id='progress_bar'>" + time + "</div>");
    barDiv.append(insideBarDiv);
    catDiv.append(barDiv);

    var headDiv = $("<h2>").text("Please Pick a Category");
    headDiv.attr('id', 'body_head');
    catDiv.append(headDiv);

    var bodyBtnDiv = $("<div id='body_buttons'>");
    var btnDiv = $("<button>").text("Animals");
    btnDiv.addClass("btn");
    btnDiv.attr('id', 'trivia_animals_btn');
    bodyBtnDiv.append(btnDiv);
    catDiv.append(bodyBtnDiv);

    $("#main_body").append(catDiv);

    // on catagory button click reset
    $("#trivia_animals_btn").click(function () {
        questionAsk()
    });
};

// main question page
function questionAsk() {
    time = 10;
    width = 100;

    var catQuestion = catAnimals[qNum];
    $("#body_buttons").html("");

    if (qNum < 10) {
        qNum++;

        // starting timer
        var timer = setInterval(qPage, 1000);

        //returning prog bar to green    
        $("#bar_wrapper").css("visibility", "visible");
        $("#progress_bar").css("background-color", "green");

        // bar movment/color change funct
        function qPage() {
            width -= (width / time);
            $("#progress_bar").text(time);
            console.log(time);
            $("#progress_bar").css("width", width + "%");
            
            if (width <= 50) {
                $("#progress_bar").css("background-color", "orange");
            }
            if (width <= 25) {
                $("#progress_bar").css("background-color", "red");
            }
            // when timeout on question page 
            if (time <= 0) {
                clearInterval(timer);
                incorrect++;
                $("#body_head").text("Oh no! You ran out of time!");
                answerPage(catQuestion.q[6], catQuestion.q[1]);
            }
            time--;
        };

        // asking question
        $("#body_head").text(catQuestion.q[0]);

        // creating 4 answer buttons
        for (i = 2; i < 6; i++) {
            var btnDiv = $("<button>").text(catQuestion.q[i].a);
            btnDiv.addClass("btn");
            var brDiv = $("<br>");
            $("#body_buttons").append(btnDiv);
            $("#body_buttons").append(brDiv);
        }

        // on clicked answer
        $(".btn").click(function anPicked() {
            clearInterval(timer);
            a = $(this).text();
            b = catQuestion.q[1];
            img = catQuestion.q[6];
            console.log(a);

            // if correct, increment^ and send to answer page
            if (a === b) {
                correct++;
                $("#body_head").text("Nice job! You got it right!");
                answerPage(img, b);

                // if incorrect, increment^ and send to answer page
            } else {
                incorrect++;
                $("#body_head").text("Oh no! Thats not right!");
                answerPage(img, b);
            };
        });
    // when all questions are asked, move to closing page     
    } else {
        closeingPage();
    }
};

// displaying the answer 
function answerPage(img, b) {
    time = 4;

    // starting timer
    var timer = setInterval(aPage, 1000);

    function aPage() {
        time--;
        console.log(time);
        if (time <= 0) {
            clearInterval(timer);
            questionAsk();
        }
    };

    $("#bar_wrapper").css("visibility", "hidden");
    $("#body_buttons").html("");

    var anP = $("<h3>");
    anP.text("The correct answer was: " + b);
    $("#body_buttons").append(anP);
    $("#body_buttons").append("<img src=" + img + " alt='gif'>");

};

// finishes game, giving some unique responses 
function closeingPage() {
    if (correct >= 10) {
        $("#body_head").text("You got em all right!");
    } else if (incorrect <= 0) {
        $("#body_head").text("You got em all wrong!");
    } else {
        $("#body_head").text("Nice job!");
    }

    $("#body_buttons").html("");

    var correctDiv = $("<div>").text("You got " + correct + " correct.");
    $("#body_buttons").append(correctDiv);

    var incorrectDiv = $("<div>").text("You got " + incorrect + " incorrect.");
    $("#body_buttons").append(incorrectDiv);

    var playDiv = $("<div>").text("Wanna play again?");
    $("#body_buttons").append(playDiv);

    var newGamebtn = $("<button>").text("New Game");
    newGamebtn.addClass("btn");
    $("#body_buttons").append(newGamebtn);
    $(".btn").click(function () {
        gameStart();
    });
}
