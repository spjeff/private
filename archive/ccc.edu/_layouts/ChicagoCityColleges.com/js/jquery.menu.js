$(document).ready(function () {


    function megaHoverOver() {
        $(this).find(".sub").stop().fadeTo('fast', 1).show();

        //Calculate width of all ul's
        (function ($) {
            jQuery.fn.calcSubWidth = function () {
                rowWidth = 0;
                //Calculate row
                $(this).find("ul").each(function () {
                    rowWidth += $(this).width();
                });
            };
        })(jQuery);


    }

    function megaHoverOut() {
        $(this).find(".sub").stop().hide();
    }


    var config = {
        sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)    
        interval: 10, // number = milliseconds for onMouseOver polling interval    
        over: megaHoverOver, // function = onMouseOver callback (REQUIRED)    
        timeout: 0, // number = milliseconds delay before onMouseOut    
        out: megaHoverOut // function = onMouseOut callback (REQUIRED)    
    };

    $("ul.topnav li .sub").css({ 'opacity': '0' });
    $("ul.topnav li").hoverIntent(config);



});