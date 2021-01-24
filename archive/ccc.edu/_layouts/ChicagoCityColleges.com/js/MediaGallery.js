$(document).ready(function () {
    $('ul.ccccarousel').jcarousel({ scroll: 5, itemFallbackDimension: 300 });

    $('ul.ccccarousel li').each(function () {
        var indexnumber = $(this).attr('jcarouselindex');
        var parentContainer = $(this).parents('.jcarousel-skin-echo');
        $(this).children('.flipper-content').children('div.text').addClass(indexnumber).appendTo(parentContainer);
    });

    $('ul.ccccarousel li').hover(function () {
        var indexnumber = $(this).attr('jcarouselindex');
        var parentContainer = $(this).parents('.jcarousel-skin-echo');

        // Remove feature-underline and show-text classes
        $(this).parent('ul').find('li.feature-underline').removeClass('feature-underline');
        parentContainer.find('.show-text').removeClass('show-text');

        // Apply show-text class only to the displayed block
        parentContainer.find('.text.' + indexnumber).addClass('show-text');
        $(this).addClass('feature-underline');
    });
});