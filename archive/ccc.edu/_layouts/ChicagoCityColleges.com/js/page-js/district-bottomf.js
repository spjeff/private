�A      ccc.edu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /_layouts/ChicagoCityColleges.com/js/page-js/district-bottom.js?rev=2018-8-9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    C:/My Web Sites/ccc.edu/ccc.edu/_layouts/ChicagoCityColleges.com/js/page-js/district-bottomf95b.js delayed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ccc.edu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /Pages/default.aspx                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     C:/My Web Sites/ccc.edu/ccc.edu/_layouts/ChicagoCityColleges.com/js/page-js/district-bottomf95b.js.z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        x   "�2\    ����            �����������������                               ��3                          OK                                                                              application/x-javascript                                                                                                        gzip                                                            (>�	                  ��������   �B�O                                               Fri, 10 Aug 2018 01:28:46 GMT                                   "40d7ce7b4930d41:0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     �                     ��*    �*    ��*    �*    �#�	    P�*                                                    "�2\                                   {                                                                                                                                                                                                                                                                                          ﻿$(function () {

    // Accordion
    $("#accordion").accordion({ header: "h2" });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
					function () { $(this).addClass('ui-state-hover'); },
					function () { $(this).removeClass('ui-state-hover'); }
				);

});

//If the news title is more than 100 characters trim it

$('.newslink').each(function () {

    if ($(this).text().length > 100) {
        $(this).text($.trim($(this).text().substr(0, 100)) + '...');
    }

});

//Left Flipper Options

//$.fn.cycle.defaults.timeout = 6000;
//$(function() {
//	$('.flipper-left .dfwp-list').cycle({
//		fx:     'fade',
//		speed:  'fast',
//		pager: '.thePager',
//		timeout: 0,
//		next:   '#next',
//		prev:   '#prev',
//		after: onAfter1
//	});

//function onAfter1(curr, next, opts) {
//   currentSlide = $(".thePager a.activeSlide").html();
//    if (!currentSlide) currentSlide = "1";
//    $('.slideCaption').html(currentSlide + ' of ' + opts.slideCount);
//}
//});

//Right Flipper Options

$.fn.cycle.defaults.timeout = 10000;
$(function () {
    $('.flipper-right .dfwp-list').cycle({
        fx: 'fade',
        speed: 'fast',
        pager: '.thePager2',
        timeout: 0,
        next: '#next2',
        prev: '#prev2',
        after: onAfter2
    });

    function onAfter2(curr, next, opts) {
        currentSlide2 = $(".thePager2 a.activeSlide").html();
        if (!currentSlide2) currentSlide2 = "1";
        $('.slideCaption2').html(currentSlide2 + ' of ' + opts.slideCount);
    }
});

//Hide Empty divs

$('.content').each(function () {
    // use $(this) to reference the current div in the loop

    if ($.trim($(this).text()) == "") {
        $(this).parent('.right-col-content').addClass("hide");
        $(this).parent('.right-col-block').addClass("hide");
        $(this).parent('.content-wrapper').addClass("hide");
        $(this).parent('.alert').addClass("hide");
        $(this).parent('#tweet').addClass("hide");
    }
});

//If there's an alert, then hide the tweet

$('.alert').each(function () {
    if ($.trim($(this).text()) != "") {
        $('#tweet').addClass("hide");
    }
});

//If there's no twitter username, hide the tweet block

if ($.trim($('.twitter-username').text()).length <= "1") {
    $('#tweet').addClass("hide");
}

if ($.trim($('.twitter-username').text()).length <= 1 && $.trim($('.twitter-alert-section.bottom #content').text()) == '') { $('.twitter-alert-section.bottom').addClass('hide'); $('.twitter-alert-section.bottom').after('<span class="empty-divider">&nbsp;</span>'); }

//Move the pause and play buttons into the slideshow paging

$(document).ready(function () {
    $('#slides ul.pagination').append($('#slides .play'));
    $('#slides ul.pagination').append($('#slides .pause'));
});


//Hides Navigation if flipper has one item

$('.flipper-left .flipper-index').each(function () {
    if ($(this).text().replace(/ /g, '') == "1of1") {
        $(this).parent('.nav').addClass('hide');
        $(this).parent('.nav').parent('.text').parent('.flipper-content').parent('.dfwp-item').parent('ul').parent('div')
    			.parent('div').parent('td').parent('tr').parent('tbody').parent('table').parent('.shadow-bottom').children('.nav').addClass('hide');
    }
});

$('.flipper-right .flipper-index').each(function () {
    if ($(this).text().replace(/ /g, '') == "1of1") {
        $(this).parent('.nav').addClass('hide');
        $(this).parent('.nav').parent('.text').parent('.flipper-content').parent('.dfwp-item').parent('ul').parent('div')
    			.parent('div').parent('td').parent('tr').parent('tbody').parent('table').parent('.shadow-bottom').children('.nav2').addClass('hide');
    }
});

//Display features title and description on hover
$(document).ready(function () {

    $('.flipper-left .flipper-wrapper.college ul.mycarousel li').each(function () {
        var indexnumber = $(this).attr('jcarouselindex');
        $(this).children('.flipper-content').children('div.text').addClass(indexnumber);

        $(this).children('.flipper-content').children('div.text').appendTo('.flipper-left .jcarousel-skin-tango');
    });

    if ($('.flipper-left .show-text').length == 0) {
        $('.flipper-left .jcarousel-item-1').addClass('feature-underline');
        $('.flipper-left .text.1').addClass('show-text');
    }

    $('.flipper-left .flipper-wrapper.college ul.mycarousel li').hover(function () {
        var indexnumber = $(this).attr('jcarouselindex');

        if ($(this).hasClass('feature-underline')) {
            $(this).removeClass('.feature-underline');
        }

        if ($('.flipper-left .show-text').length) {
            if ($('.flipper-left .text.' + indexnumber + '.show-text').length == 0) {
                $('.flipper-left .text.show-text').removeClass('show-text');
                $('.flipper-left li.feature-underline').removeClass('feature-underline');

                $('.flipper-left .text.' + indexnumber).addClass('show-text');
                $(this).addClass('feature-underline');
            }
            else { $('.flipper-left .text.' + indexnumber).addClass('show-text'); }
        }
        else { $(this).children('.flipper-content').children('.text').addClass('show-text'); }
    });


    $('.flipper-right .flipper-wrapper.college ul.mycarousel li').each(function () {
        var indexnumber = $(this).attr('jcarouselindex');
        $(this).children('.flipper-content').children('div.text').addClass(indexnumber);

        $(this).children('.flipper-content').children('div.text').appendTo('.flipper-right .jcarousel-skin-tango');
    });

    if ($('.flipper-right .show-text').length == 0) {
        $('.flipper-right .jcarousel-item-1').addClass('feature-underline');
        $('.flipper-right .text.1').addClass('show-text');
    }

    $('.flipper-right .flipper-wrapper.college ul.mycarousel li').hover(function () {
        var indexnumber = $(this).attr('jcarouselindex');

        if ($(this).hasClass('feature-underline')) {
            $(this).removeClass('.feature-underline');
        }

        if ($('.flipper-right .show-text').length) {
            if ($('.flipper-right .text.' + indexnumber + '.show-text').length == 0) {
                $('.flipper-right .text.show-text').removeClass('show-text');
                $('.flipper-right li.feature-underline').removeClass('feature-underline');

                $('.flipper-right .text.' + indexnumber).addClass('show-text');
                $(this).addClass('feature-underline');
            }
            else { $('.flipper-right .text.' + indexnumber).addClass('show-text'); }
        }
        else { $(this).children('.flipper-content').children('.text').addClass('show-text'); }
    });

});        