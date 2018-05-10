var userId = '602156';
var apiKey = 'fb6d6d568269f3d420212694f375fd44';
var data = 'JSON Request Data';
var queryURL = "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/:cancer";
$.ajax({
url: queryURL,
method: "POST",
dataType:'json',
headers: {
"authorization": "Basic " + btoa(userId+":"+apiKey),

"Content-Type":'application/json'
},
data:JSON.stringify(data)
}).then( function(resp){
    console.log(resp);
});


var isMenuOpen;


$(document).ready(introLoad)

function introLoad() {
    spinny();
    $(".signIcon").on("click", function() {

        console.log("icon clicked");
        $("#welcomeHeading").css("opacity", "0");
        $('li').css({
            'transform': 'translate(-44vw, -38vh)',
            WebkitTransition : 'all 1s ease-in-out',
            MozTransition    : 'all 1s ease-in-out',
            MsTransition     : 'all 1s ease-in-out',
            OTransition      : 'all 1s ease-in-out',
            transition       : 'all 1s ease-in-out'
        });
        $('li:not(#sunIcon)').css({
            'opacity': '0'
        });
        //setTimeout(function() {$('li:not(#sunIcon)').css({
        //    'display': 'none'
        //})}, 1000);
        
        isMenuOpen = false;
        mainPage();
        
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
            WebkitTransition : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MozTransition    : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            MsTransition     : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            OTransition      : 'all 1s cubic-bezier(0.25,1,0.2,1)',
            transition       : 'all 1s cubic-bezier(0.25,1,0.2,1)'
        });
    });
}

    

function mainPage() {
    console.log("begin mainPage");
    $("#sunIcon").on("click", menuOpen);
}

function menuOpen() {
    console.log("begin menuOpen");
    $('li').css({
        'transform': 'translate(calc(50% - 35px), calc(50% - 35px)',
        WebkitTransition : 'all 1s ease-in-out',
        MozTransition    : 'all 1s ease-in-out',
        MsTransition     : 'all 1s ease-in-out',
        OTransition      : 'all 1s ease-in-out',
        transition       : 'all 1s ease-in-out'
    });
    $('li').css({
        'opacity': '1'
    });
    
    setTimeout(spinny, 1000);
    
}