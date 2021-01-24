$(document).ready(function () {

});

/*$(window).resize(function () {
    if ($(window).width() > 768) {

        $(function () {
            $('#megamenucontainer .yamm .nav li.dropdown').hover(
           function () { $(this).addClass('open') },
           function () { $(this).removeClass('open') }
    )
        })

    } else {


        $(function () {
            window.prettyPrint && prettyPrint()
            $(document).on('click', '.yamm .dropdown-menu', function (e) {
                e.stopPropagation()
            })
        });

    }


},2000);*/
/*$(document).ready(function () {
    if ($(window).width() > 768) {

        $(function () {
            $('#megamenucontainer .yamm .nav li.dropdown').hover(
           function () { $(this).addClass('open') },
           function () { $(this).removeClass('open') }
    )
        })


    } else {

        $(function () {

            window.prettyPrint && prettyPrint()
            $(document).on('click', '.yamm .dropdown-menu', function (e) {
                e.stopPropagation()
            })
        });

    }


});*/
$(document).ready(function () {

/* Added by Tayyab */
//window.setTimeout(function () {
        $('#megamenucontainer .yamm .nav li.dropdown').hover(
            function () { $(this).addClass('open') },
            function () { $(this).removeClass('open') }
    )
       // },2000);
//var url = "https://brandes365.sharepoint.com" + _spPageContextInfo.siteServerRelativeUrl;
//if(url === "https://brandes365.sharepoint.com/sites/pmcs"){
//($("#navigation .navbar-default .navbar-nav > li").css({'padding-left':'95px','margin-left': '0px', 'margin-right': '0px'}));
//}
//$(".dropdown-submenu").hover(function(event){
//var licount=  ($(event.target).parent().children("li>ul").children("li").length);
//if(licount > 6){
//($(event.target).parent('.dropdown-submenu, #navigation .dropdown-menu > li > a').css({'position':'static'}));
//($(event.target).parent().find('.dropdown-menu').css({'margin-left':'-35px'}));
//($('.dropdown-submenu>.dropdown-menu> .dropdown-submenu>.dropdown-menu').css({'margin-left':'-1px'}));
//}
//});    

    $('.search-bar.yamm .dropdown-toggle').click(function () {
        $('.dropdown-menu.search-menu').toggle("fast");
        $('.search-bar.yamm .navbar-nav > li').addClass("open");
       // $('.info').hide();
    });
    $('.search-bar.yamm .dropdown-toggle').hover(function () {
              $('.search-bar.yamm .navbar-nav > li').addClass("open");
        // $('.info').hide();
    });
   
    $('.search-bar.yamm .navbar-nav > li').hover(
       function () { $(this).addClass('open') },
       function () { $(this).removeClass('open'),
        $('.dropdown-menu.search-menu').hide();
       $('.dropdown-menu.search-menu').hide();

       }
	);
    $('.search-bar.yamm .dropdown-toggle').click(
        $('.dropdown-menu.search-menu').toggle("fast"),
      $('.search-bar.yamm .navbar-nav > li').toggleClass('open')
      //function () { $('.search-bar.yamm .navbar-nav > li').removeClass('open') }
   );
    //$("#menuscontainer").click(function () {
    //    $(this).focus();
    //});
    $("#megamenucontainer").hover(function () {
        $('.dropdown-menu.search-menu').hide();
       $('.search-bar.yamm .navbar-nav > li').removeClass("open");
        
    });
    $('.dropdown-menu.search-menu').hide();
    $('.search-bar.yamm .navbar-nav > li').removeClass("open");
    //$('.dropdown-menu.search-menu').click(function (e) {
    //    e.stopPropagation();
    //});




});

/****************************************************************/



//var wrap = $("#s4-workspace");

//wrap.on("scroll", function (e) {

//    if (this.scrollTop > 1) {
//       // wrap.addClass("fix-search");
//        $('header').addClass("fixed-header").animate({ height: "40px", 'line-height': "40px" }, 400);
//    } else {
//        $('header').removeClass("fixed-header").animate({height: "93px", 'line-height': "93px" }, 400);
//        //wrap.removeClass("fix-search");
//    }

//});

var wrap = $("#s4-workspace");
wrap.on("scroll", function (e) {
    if (this.scrollTop > 0) {
        $("header").addClass("sticky", 1500);
    } else {
        $("header").removeClass("sticky", 1000);
    }
});
$('body').addClass('FITPageLayout3ColumnBody', $('.FITPageLayout3Column ').length);
$( document ).ready(function() {
    
setTimeout(function(){ 


$('body').addClass('FITPageLayout3ColumnBody', $('.FITPageLayout3Column ').length);


 }, 1000);

    
});
