var isMenuOpen;
var chosenSign;

$(document).ready(function() {
    $('.tooltipped').tooltip({
        exitDelay: 0,
        margin: 10
    });
    introLoad();
});

function introLoad() {
    spinny();
    isMenuOpen = true;
    $(".signIcon").on("click", function() {
        $('.tooltip').tooltip('destroy');
        chosenSign = $(this).attr("id");
        console.log("icon clicked");
        $("#welcomeHeading").css("opacity", "0");
        displayHoroscope(chosenSign);
        menuClose();
    });
}

function spinny() {
    console.log("begin spinny");
    
    var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
        radius = '12em', //distance from center
        start = 0, //shift start from 0
        $elements = $('li:not(:last-child)'),
        numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
        slice = 360 * type / numberOfElements;

    $elements.each(function(i) {
        var $self = $(this),
            rotate = slice * i + start,
            rotateReverse = rotate * -1;
        $self.css({
            'transform': 'rotate(' + rotate + 'deg) translateY(-' + radius + ') rotate(' + rotateReverse + 'deg)',
            'opacity': '1',
            WebkitTransition : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MozTransition    : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MsTransition     : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            OTransition      : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            transition       : 'all 1s cubic-bezier(0.25,1,0.2,1)'
        });
    });
}

function menuOpen() {
    console.log("begin menuOpen");
    $('li').css({
        'transform': 'translate(calc(50% - 35px), calc(50% - 35px)',
        WebkitTransition : 'all 500ms ease-in-out',
        MozTransition    : 'all 500ms ease-in-out',
        MsTransition     : 'all 500ms ease-in-out',
        OTransition      : 'all 500ms ease-in-out',
        transition       : 'all 500ms ease-in-out'
    });
    $("#horoBox").css("opacity", "0");
    $("#sunImg").attr("data-tooltip", "Find your Sign");
    setTimeout(spinny, 500);
    isMenuOpen = true;
}

function menuClose() {
    $('li', ).css({
        'transform': 'translate(-44vw, -38vh)',
        WebkitTransition : 'all 0.7s ease-in-out',
        MozTransition    : 'all 0.7s ease-in-out',
        MsTransition     : 'all 0.7s ease-in-out',
        OTransition      : 'all 0.7s ease-in-out',
        transition       : 'all 0.7s ease-in-out'
    });
    $('li:not(#sun)').css("opacity", "0");
    $("#sunImg").attr("data-tooltip", "Open Menu");
    isMenuOpen = false;
}

$("#sun").on("click", function(){
    console.log("sun clicked");
    if (isMenuOpen === false) {
        menuOpen();
    } else {
        signHelper();
    }
});

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
function displayHoroscope(chosenSign) {
    $("#horoContent").text("Loading...");
    setTimeout(function(){$("#horoBox").css("opacity", "1")}, 700);
    
    console.log(chosenSign);
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
        // data: JSON.stringify(data)
    });
    return (request.then(function (resp) {
        console.log(resp);
        var signObj = Object.values(resp.prediction);
        var keys = Object.keys(resp.prediction);
        console.log(resp.prediction.health);
        var newDiv = $("<div>");
        var signHeading = $("<h1>");
        signHeading.text(chosenSign.charAt(0).toUpperCase() + chosenSign.substr(1));
        signHeading.css("text-align", "center");
        $(newDiv).append(signHeading);
        for (var i = 0; i < keys.length; i++) {
            var newHeading = $("<h2>");
            var newP = $("<p>");   

            // Grab the text from input box, trim beginning/ending whitespace
            var key = keys[i];

            // Split input string into individual words
            var searchSplit = key.split("_");

            // For each word in string..
            for (var j = 0; j < searchSplit.length; j++)
            {   // ..capitalize first character of word
                searchSplit[j] = searchSplit[j].charAt(0).toUpperCase() + searchSplit[j].substr(1);
            }
            // Join words back into single string
            key = searchSplit.join(" ");
            console.log(key);
            // Replace spaces in string with Unicode NBSP
            //key = key.replace(/\s+/g, '\u00a0');
            newHeading.text(key);
            newP.text(signObj[i]);
            $(newDiv).append(newHeading);
            $(newDiv).append(newP);
        } 
        console.log(newDiv);
        $("#horoContent").html(newDiv);
        getAPOD();

    }, function (err) {
        return err;
    }));
    
    

    
}

function getAPOD() {
    console.log("go apod");
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

            if (result.media_type == "video") {
                $("#apod_img_id").css("display", "none");
                $("#apod_vid_id").attr("src", result.url);
            }
            else {
                $("#apod_vid_id").css("display", "none");
                $("#apod_img_id").attr("src", result.url);
            }
            $("#reqObject").text(url);
            $("#returnObject").text(JSON.stringify(result, null, 4));
            $("#apod_explanation").text(result.explanation);
            $("#apod_title").text(result.title);
        }

    });
}