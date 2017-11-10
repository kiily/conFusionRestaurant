
//Carousel button behavior
$(document).ready(function(){
    //set sliding interval to 2000ms
    $("#mycarousel").carousel({interval: 2000});
    $("#carousel-button").click(function(){
        //if there is an element with the span tag and a pause button
        if($("#carousel-button").children("span").hasClass("fa-pause")){
            //currently active as pause button
            $("#mycarousel").carousel('pause');
            $('#carousel-button').children("span").removeClass("fa-pause");
            $('#carousel-button').children("span").addClass("fa-play");
S
        }

        else if($("#carousel-button").children("span").hasClass("fa-play")){
            //currently active as play button
            $("#mycarousel").carousel('cycle');
            $('#carousel-button').children("span").removeClass("fa-play");
            $('#carousel-button').children("span").addClass("fa-pause");

        }


    });

    //not needed after the buttons are collapsed
    // $("#carousel-play").click(function(){
    //     $("#mycarousel").carousel('cycle');
    // });
});