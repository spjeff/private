$(document).ready(function () {
    $("area[rel^='prettyPhoto']").prettyPhoto();

    $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'facebook', slideshow: 3000, autoplay_slideshow: false, deeplinking: false });
    $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'fast', slideshow: 10000, hideflash: true, deeplinking: false });

    $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
        custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
        changepicturecallback: function () { initialize(); }
    });

    $(".icon-feedback").prettyPhoto();
    //var feedbackMarkup = $(".feedbackContainer").html();
    //$(".social-links a[rel^='prettyPhoto']").prettyPhoto({
    //custom_markup: feedbackMarkup, allow_resize:false
    //});
});