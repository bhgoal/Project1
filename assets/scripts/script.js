
var config = {
    apiKey: "AIzaSyAxbza5xyLJfMdsEg-EkMg9khxDpgdC7IY",
    authDomain: "auth1-81f49.firebaseapp.com",
    databaseURL: "https://auth1-81f49.firebaseio.com",
    projectId: "auth1-81f49",
    storageBucket: "auth1-81f49.appspot.com",
    messagingSenderId: "566405499754"
};
firebase.initializeApp(config);

//getting signin elemnts

var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var newEmail = document.getElementById('newEmail');
var newPassword = document.getElementById('newPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogOut = document.getElementById('btnLogOut');

// Add sign in event

$("#btnSignIn").on("click", function () {

    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    console.log(email);
    console.log(pass);


    var promise = auth.signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
            console.log(error.message)
            alert(error.message);
        }
        );

});

// add login event

$("#btnSignUp").on("click", function () {

    var email = newEmail.value;
    var pass = newPassword.value;
    var auth = firebase.auth();
    console.log(email);
    console.log(pass);

    var promise = auth.createUserWithEmailAndPassword(email, pass)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
});


// authentication event listener

firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#signIn").addClass("none");
        $("#create").addClass("none");
        $("#logOut").removeClass("none");
    }
    else {
        console.log("not logged in")
        $("#signIn").removeClass("none");
        $("#create").removeClass("none");
        $("#logOut").addClass("none");
    }
})

firebase.auth().onAuthStateChanged(function (user) {
    window.user = user; // user is undefined if no user signed in
});

$("#logOut").on("click", function () {

firebase.auth().signOut();

});

var isMenuOpen;
var chosenSign;

$(document).ready(function () {
    // Initiate tooltip function
    $('.tooltipped').tooltip({
        exitDelay: 0,
        margin: 10
    });
    introLoad();
});

// On initial page load, run spin animation and create listener for icon clicks
function introLoad() {
    spinny();
    isMenuOpen = true;
    $(".signIcon").on("click", function () {
        // Store the sign that was clicked on
        chosenSign = $(this).attr("id");
        console.log("icon clicked");
        // Fade away the welcome heading
        $("#welcomeHeading").css("opacity", "0");
        // Run function for showing the sign's horoscope
        displayHoroscope(chosenSign);
        // Run function for closing the menu
        menuClose();
    });
}

// Function for creating the icons' spin animation
function spinny() {
    console.log("begin spinny");

    var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
        radius = '12em', //distance from center
        start = 0, //shift start from 0
        $elements = $(".signIcon"),
        numberOfElements = (type === 1) ? $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
        slice = 360 * type / numberOfElements;

    $elements.each(function (i) {
        var $self = $(this),
            rotate = slice * i + start,
            rotateReverse = rotate * -1;
        $self.css({
            'transform': 'rotate(' + rotate + 'deg) translateY(-' + radius + ') rotate(' + rotateReverse + 'deg)',
            'opacity': '1',
            WebkitTransition: 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MozTransition: 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MsTransition: 'all 1s cubic-bezier(0.25,1,0.2,1)',
            OTransition: 'all 1s cubic-bezier(0.25,1,0.2,1)',
            transition: 'all 1s cubic-bezier(0.25,1,0.2,1)'
        });
    });
}


// When menu is opened...
function menuOpen() {
    console.log("begin menuOpen");
    // ..move icons back to center of page
    $(".signIcon, .menuIcon").css({
        'transform': 'translate(calc(50% - 35px), calc(50% - 35px)',
        WebkitTransition: 'all 500ms ease-in-out',
        MozTransition: 'all 500ms ease-in-out',
        MsTransition: 'all 500ms ease-in-out',
        OTransition: 'all 500ms ease-in-out',
        transition: 'all 500ms ease-in-out'
    });
    // Fade away previous horoscope box
    $("#horoBox").css("opacity", "0");
    // Change sun tooltip from "open menu" to "sign finder"
    $("#sunImg").attr("data-tooltip", "Find your Sign");
    // After icons have moved, run spin animation
    setTimeout(spinny, 500);
    isMenuOpen = true;
}

// When menu is closed...
function menuClose() {
    // ..move icons to corner of page
    $(".signIcon, .menuIcon").css({
        'transform': 'translate(-47vw, -45vh)',
        WebkitTransition: 'all 0.7s ease-in-out',
        MozTransition: 'all 0.7s ease-in-out',
        MsTransition: 'all 0.7s ease-in-out',
        OTransition: 'all 0.7s ease-in-out',
        transition: 'all 0.7s ease-in-out'
    });
    // Fade away sign icons, leave only sun icon
    $(".signIcon").css("opacity", "0");
    // Change sun tooltip from "sign finder" to "open menu"
    $("#sunImg").attr("data-tooltip", "Open Menu");
    isMenuOpen = false;
}

// When sun is clicked...
$("#sun").on("click", function () {
    console.log("sun clicked");
    // If menu is closed, sun functions as open menu button
    if (isMenuOpen === false) {
        menuOpen();
    } // If menu is open, sun functions as sign help button
    else {
        signHelper();
    }
});

// Function for opening sign helper modal
function signHelper() {
    event.preventDefault();
    $('#helperModal').modal({
        opacity: 0.5,
        startingTop: "15%",
        endingTop: "15%"
    });

    var elem = $("#helperModal");
    var instance = M.Modal.getInstance(elem);
    instance.open();
}

$("#create").on("click", function () {
    createAccount();
});

function createAccount() {
    event.preventDefault();
    $('#signUpModal').modal({
        opacity: 0.5,
        startingTop: "15%",
        endingTop: "15%"
    });

    var elem = $("#signUpModal");
    var instance = M.Modal.getInstance(elem);
    instance.open();
    $('.datepicker').datepicker({

    });
}

$("#signIn").on("click", function () {
    signInAccount();
});

function signInAccount() {
    event.preventDefault();
    $('#signInModal').modal({
        opacity: 0.5,
        startingTop: "15%",
        endingTop: "15%"
    });

    var elem = $("#signInModal");
    var instance = M.Modal.getInstance(elem);
    instance.open();
}

// Function for creating and displaying horoscope info
function displayHoroscope(chosenSign) {
    // Display loading text while waiting for slowass horoscope API
    $("#horoContent").text("Loading...");
    // Fade in content box
    setTimeout(function () { $("#horoBox").css("opacity", "1") }, 700);
    console.log(chosenSign);

    // Horoscope API request code
    var userId = '602156';
    var apiKey = 'fb6d6d568269f3d420212694f375fd44';
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var request = $.ajax({
        url: proxyUrl + "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/" + chosenSign,
        method: "POST",
        dataType: 'json',
        headers: {
            "authorization": "Basic " + btoa(userId + ":" + apiKey),
            "Content-Type": 'application/json'
        },
    });
    return (request.then(function (resp) {
        console.log(resp);
        // Keys are the headings for each horoscope section
        var keys = Object.keys(resp.prediction);
        // signObj are the predictions for each key
        var signObj = Object.values(resp.prediction);
        console.log(resp.prediction.health);
        // Create div to hold content
        var newDiv = $("<div>");

        // Create heading to show which sign was chosen
        var signHeading = $("<h1>");
        signHeading.text(chosenSign.charAt(0).toUpperCase() + chosenSign.substr(1));
        signHeading.css("text-align", "center");
        $(newDiv).append(signHeading);

        // For every key in the response...
        for (var i = 0; i < keys.length; i++) {
            var newHeading = $("<h2>");
            var newP = $("<p>");

            // Create var to store a single key
            var key = keys[i];
            // Split key into individual words
            var keySplit = key.split("_");
            // For each word in string..
            for (var j = 0; j < keySplit.length; j++) {   // ..capitalize first character of word
                keySplit[j] = keySplit[j].charAt(0).toUpperCase() + keySplit[j].substr(1);
            }
            // Join words back into single string
            key = keySplit.join(" ");
            console.log(key);

            // Add key and predictions to content div
            newHeading.text(key);
            newP.text(signObj[i]);
            $(newDiv).append(newHeading);
            $(newDiv).append(newP);
        }
        console.log(newDiv);
        // Add content div to horo box
        $("#horoContent").html(newDiv);
        // Run function for APOD
        getAPOD();

    }, function (err) {
        return err;
    }));
}

function getAPOD() {
    var url = "https://api.nasa.gov/planetary/apod?api_key=pC4qsyruPKlcXACxH2QIgyg9mbsDr1fVq4dKEUJp";
    $.ajax({
        url: url,
        method: "GET",
        success: function (result) {
            if ("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }
            // If APOD is a video, hide img div and show video
            if (result.media_type == "video") {
                $("#apod_img_id").css("display", "none");
                $("#apod_vid_id").attr("src", result.url);
            }
            // If APOD is an image, hide video div and show img
            else {
                $("#apod_vid_id").css("display", "none");
                $("#apod_img_id").attr("src", result.url);
            }

            // Hey Kevin we can delete these two right?
            $("#reqObject").text(url);
            $("#returnObject").text(JSON.stringify(result, null, 4));

            // Add caption and title to APOD content boxes
            $("#apod_explanation").text(result.explanation);
            $("#apod_title").text(result.title);
        }
    });
}