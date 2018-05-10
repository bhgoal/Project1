$(document).ready(function () {

    iconAnimStart();

    $('.modal').modal();





    function iconAnimStart() {
        var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
            radius = '12em', //distance from center
            start = -90, //shift start from 0
            $elements = $('li:not(:last-child)'),
            numberOfElements = (type === 1) ? $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
            slice = 360 * type / numberOfElements;

        $elements.each(function (i) {
            var $self = $(this),
                rotate = slice * i + start,
                rotateReverse = rotate * -1;

            $self.css({
                'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
            });
        });
    }

    $(".iconBtn").on("click", function (event) {

        var newDiv = $("<div>");

        event.preventDefault();

        var sign = $(this).attr("name");
        console.log(sign)

        if (sign === "sun") {
            return;
        } else {
            displayHoroscope();
        }

        var elem = $(".modal");
        var instance = M.Modal.getInstance(elem);
        instance.open();




    function displayHoroscope() {
        var userId = '602156';
        var apiKey = 'fb6d6d568269f3d420212694f375fd44';
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        var request = $.ajax({
            url: proxyUrl + "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/" + sign,
            method: "POST",
            dataType: 'json',
            headers: {
                "authorization": "Basic " + btoa(userId + ":" + apiKey),
                "Content-Type": 'application/json'
            },
            // data: JSON.stringify(data)
        });

        // Returns A promise
        return (request.then(function (resp) {


            console.log(resp);
            var signObj = Object.values(resp.prediction);
            var keys = Object.keys(resp.prediction);


            console.log(resp.prediction.health);


            for (var i = 0; i < keys.length; i++) {
                var newHeading = $("<h2>");
                var newP = $("<p>");
                

                newHeading.text(keys[i]);
                newP.text(signObj[i]);

                $(newDiv).append(newHeading);
                $(newDiv).append(newP);
            } $(".sign-content").html(newDiv);

        }, function (err) {
            return err;
        }));
    }

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
            $("#apod_explaination").text(result.explanation);
            $("#apod_title").text(result.title);
        }

    });

});


});

