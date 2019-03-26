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
        q: ["What collor is hippopotamus milk?",
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
var gameRunning = false;
var a = "";
var b = "";
var img = "";
var alreadyAsked = [];
var aPage = false;
var timer;

$("#trivia_animals_btn").click(function gameStart() {
    correct = 0;
    incorrect = 0;

    if (!gameRunning) {
        gameRunning = true;

        questionAsk()
    };

});

function questionAsk() {
    aPage = false;
    var randNum = Math.floor(Math.random() * 11);
    var catQuestion = catAnimals[randNum];

    progressBar(30);
    $("#bar_wrapper").css("visibility", "visible");

    $("#body_head").html("<h2>" + catQuestion.q[0] + "</h2>");
    $("#body_buttons").html("");

    for (i = 2; i < 6; i++) {
        $("#body_buttons").append("<button>" + catQuestion.q[i].a + "</button>");
        $("#body_buttons button").addClass("btn");
        $("#body_buttons").append("<br>");
    }

    $(".btn").click(function anPicked() {
        a = $(this).text();
        b = catQuestion.q[1];
        img = catQuestion.q[6];
        console.log(a);

        if (a === b) {
            correct++;
            $("#body_head").html("<h2>Nice job! You got it right!</h2>");
            ansPage();

        } else {
            incorrect++;
            $("#body_head").html("<h2>Oh no! Thats not right!</h2>");
            ansPage();
        };
    });
};

function progressBar(time) {
    var width = 100;
    timer = setInterval(qPage, 1000);
    $("#progress_bar").css("background-color", "green");
    
    function qPage() {
        time--;
        width -= (width / time);
        if (width <= 50) {
            $("#progress_bar").css("background-color", "orange");
        }

        if (width <= 25) {
            $("#progress_bar").css("background-color", "red");
        }

        if (time <= 0) {
            if (aPage === false) {
                aPage = true;
                incorrect--;
                clearInterval(timer);
                ansPage();            
            }
            else {
                clearInterval(timer);
                questionAsk();            
            }
        } else {
            console.log(time);
            $("#progress_bar").text("00:" + time);
            $("#progress_bar").css("width", width + "%");
        };
    };
};

function ansPage() {
    aPage = true;
    clearInterval(timer);
    progressBar(10);
    $("#bar_wrapper").css("visibility", "hidden");
    $("#body_buttons").html("<h3>The correct answer was: " + b + "</h3>");
    $("#body_buttons").append("<img src=" + img + " alt='gif'>");
};