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


var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '12em', //distance from center
    start = -90, //shift start from 0
    $elements = $('li:not(:first-child)'),
    numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
    slice = 360 * type / numberOfElements;

$elements.each(function(i) {
    var $self = $(this),
        rotate = slice * i + start,
        rotateReverse = rotate * -1;
    
    $self.css({
        'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
    });
});