�A      ccc.edu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /_layouts/ChicagoCityColleges.com/js/page-js/master-bottom.js?rev=2018-8-9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      C:/My Web Sites/ccc.edu/ccc.edu/_layouts/ChicagoCityColleges.com/js/page-js/master-bottomf95b.js delayed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ccc.edu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /Pages/default.aspx                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     C:/My Web Sites/ccc.edu/ccc.edu/_layouts/ChicagoCityColleges.com/js/page-js/master-bottomf95b.js.z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          x   >�2\    ����            �����������������                               0B�	                    [N      OK                                                                              application/x-javascript                                                                                                        gzip                                                            @x�	    [N              ��������   �B�O                                               Fri, 10 Aug 2018 01:28:46 GMT                                   "05b4d7b4930d41:0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      �                     ��*    �*    ��*    �*    �#�	    P�*                                                    >�2\                                   z                                                                                                                                                                                                                                                                                    [N      //Add first class to first list item in global nav
$('.topnav.global-nav li').first().addClass('first');

//Add directory class to the directory list item
$('ul.topnav.global-nav li').each(function () {
    if ($(this).find('.dfwp-item').children('a').text() == 'Directories') {
        $(this).addClass('directory');
    }
});

//Add last class to the about us list item
$('.topnav.primary-nav li').each(function () {
    if ($(this).find('.dfwp-item').children('a').text() == 'About Us') {
        $(this).addClass('last');
    }
});

//Adds Edit-Mode class to Edit pages
if ($('.edit-mode-indicator').length) {
    $("body").addClass("edit-mode");
}

else if ($('.display-mode-indicator').length) {
    $('body').addClass('display-mode');
}


//Hides Extra Summary Options
$('body.edit-mode .right-col-block.summary .ms-toolbarContainer').each(function () {
    $(this).children('.ms-selectorlink').slice(1, 3).addClass('hide');
});

var initialsearch = ($('.search-results-box input').val());
$('.search-text-field').val(initialsearch);

//Sets I Want To href values
if (site2 == "") {
    $(".iwantto-item").each(function (index) { $(this).attr('href', '/Services/Pages/default.aspx?cat=' + $(this).text()); })
    $(".iwantto-viewallitem").each(function (index) { $(this).attr('href', '/Services/Pages/default.aspx'); })
}
else {
    $(".iwantto-item").each(function (index) { $(this).attr('href', '/colleges/' + site2 + '/Services/Pages/default.aspx?cat=' + $(this).text()); })
    $(".iwantto-viewallitem").each(function (index) { $(this).attr('href', '/colleges/' + site2 + '/Services/Pages/default.aspx'); })
}

//Set title tag to match alt text for images
$('img').each(function () {
    $(this).attr('title', $(this).attr('alt'));
});

$(document).ready(function () {
    $('.jPag-sprevious').click(function () {
        $('.jPag-current').parent().prev($('li a')).click();
    });

    $('.jPag-snext').click(function () {
        $('.jPag-current').parent().next($('li a')).click();
    });

    $('#gallery').before('<h2>Photo Gallery</h2>');

    //CareerFinder Featured Industry
    $('.careerfinder .flipper-content').click(function () {
        var industry = $(this).children('.text').text();
        $('.clear-selection').click();
        $('.industryFilterValue select').val(industry);
        $('.career-search-button input').click();
    });
    //End CareerFinder	

    //ProgramFinder Featured Category
    $('.programfinder .flipper-content').click(function () {
        var category = $(this).children('.text').text();
        $('.clear-selection').click();
        $(".areaOfStudyFilterValue select").val(category);
        $('.program-search-button input').click();
    });
    //End ProgramFinder

    //Rich Text Expand/Collapse
    $('.rte-toggle-item .rte-toggle-title').click(function () {

        $(this).parent('.rte-toggle-item').children('.rte-toggle-desc').toggle();
    });
    //End Rich Text Expand/Collapse

});

$(document).ready
    (function () {
        var options;
        var a;

        options = { serviceUrl: '/pages/suggestproxy.aspx' };

        $('.google-search').each(function () {
            a = $(this).autocomplete(options);
        });

    });

$('.primary-nav a.menu-item').focus(function () {
    if ($('.active-parent').length >= 1) {
        $('.active-parent').removeClass('active-parent');
        $('.sub').css('opacity', 0).css('display', 'none');
    }
    $(this).addClass('active-parent');
    $(this).next('.sub').css('opacity', 1).css('display', 'block');
});
$('.global-nav a.menu-item').focus(function () {
    if ($('.active-parent').length >= 1) {
        $('.active-parent').removeClass('active-parent');
        $('.sub').css('opacity', 0).css('display', 'none');
    }
    $(this).addClass('active-parent');
    $(this).next('.sub').css('opacity', 1).css('display', 'block');
});
//Add an "external" class to each link that has a "_blank" target, then add title text

$('a[target^="_blank"]').addClass('external');

$('a.external').each(function () {
    $(this).attr('title', 'This link opens in a new window.');
});

//$('a.external').click(function (event) {
//    event.preventDefault();
//    var r = confirm("You are being re-directed to an external website. Press OK to contiue.");
//    if (r == true) { window.open($(this).attr('href')); }
//    else { return (false); }
//});


// Remove invalid attributes from content by query webpart divs (for accessibility purposes)
//$('div').each(function (index) {
//    $(this).removeAttr('webpartid');
//    $(this).removeAttr('haspers');
//    $(this).removeAttr('onlyformepart');
//    $(this).removeAttr('allowminimize');
//    $(this).removeAttr('allowremove');
//    $(this).removeAttr('allowdelete');
//});

// Detach the invalid, hidden ie:menuitem tag from the DOM
//$('.ms-SrvMenuUI').detach();
// Display Alert text
google.load("feeds", "1");

function feedLoaded(result) {
    if (!result.error) {
        var container = document.getElementById("feedContent");
        container.innerHTML = '';

        if (result.feed.entries.length > 0) {
            var entry = result.feed.entries[0];
            var div = document.createElement("div");
            div.className = "alert";
            div.appendChild(document.createTextNode(entry.content));
            container.appendChild(div);

            $('.feed-alert-section').fadeIn(2000);

            $('.alert').each(function () {
                var $this = $(this);
                var t = $this.text();
                $this.html(t.replace('&lt', '<').replace('&gt', '>'));
            });

        }
    }
}

function OnLoad() {
    var feedAddress = '';
    var currentSite = site2;
    if (currentSite == '') {
        currentSite = 'district';
    }

    var feedPaths = $('.feedInfo').text().split(';');
    var i = 0;
    for (i = 0; i < feedPaths.length; i++) {
        var feedEntry = feedPaths[i].split(',');
        if (feedEntry.length == 2 && feedEntry[0].toLowerCase() == currentSite) {
            feedAddress = feedEntry[1];
        }
    }

    var num = 1;
    var feed = new google.feeds.Feed(feedAddress);
    feed.setNumEntries(num);
    feed.load(feedLoaded);

}

google.setOnLoadCallback(OnLoad);



//set top padding of the workspace to the height of the ribbon
function setTopPadding() {
    var wrkElem = document.getElementById('s4-workspace');
    var ribHeight = document.getElementById('s4-ribbonrow').offsetHeight;
    if (window.location.search.match("[?&]IsDlg=1")) {
        //margin works better for dialogs b/c of scrollbars
        wrkElem.style.marginTop = ribHeight + 'px';
        wrkElem.style.paddingTop = '0px';
    }
    else {
        //padding works better for the main window
        wrkElem.style.paddingTop = ribHeight + 'px';
    }
}

// bind top padding reset to ribbon resize event so that the page always lays out correctly.
ExecuteOrDelayUntilScriptLoaded(function () { SP.UI.Workspace.add_resized(setTopPadding); }, "init.js");

//Update the names of colleges on District Event Search Pages

if ($('.college-name').length) {
    $('.college-name').each(function () {
        var collegename = $.trim($(this).text());
        switch (collegename) {
            case 'Washington': $(this).text('Harold Washington')
                break;
            case 'Truman': $(this).text('Harry S Truman')
                break;
            case 'Kennedy': $(this).text('Kennedy-King')
                break;
            case 'Malcolm-X': $(this).text('Malcolm X')
                break;
            case 'Olive-Harvey': $(this).text('Olive-Harvey')
                break;
            case 'Daley': $(this).text('Richard J. Daley')
                break;
            case 'Wright': $(this).text('Wilbur Wright')
                break;


        }
    });
}

$(document).ready(function () {

    if ($('.feature-event-wrapper.hide').length) {
        $('#right-column .search-right .date-picker').addClass('no-feature');
    }

    //Create Mobile friendly Global nav
    $('.header').prepend('<span class="main-link global-nav-link">Quick Links</span><ul class="global-mobile-nav hide"><li class="global-nav-link">Close</li><li class="links-title">Quick Links</li><li class="back-button hide"><a href="#" class="back">Back</a></li></ul>');

    $('.topnav.global-nav .menu-item').each(function () {
        $(this).clone().appendTo('.global-mobile-nav');
        //$(this).next('div').find('ul li a').clone().appendTo('.global-mobile-nav');
        $(this).next('div').find('ul li').clone().appendTo('.global-mobile-nav');
    });

    $('.global-mobile-nav a.menu-item').each(function () {
        $(this).wrap('<li class="global-mobile-item" />');
    });

    $('.global-mobile-item').each(function () {
        $(this).append('<ul class="global-mobile-sub hide" />');
        $(this).nextUntil('.global-mobile-item').addClass('sub-item').appendTo($(this).children('.global-mobile-sub')).wrap('<li />');
    });

    $('.global-mobile-item a.menu-item').click(function (e) {
        e.preventDefault();
        $(this).parent('.global-mobile-item').toggleClass('expanded');
        $(this).next('ul').toggleClass('hide');
        $('ul.global-mobile-nav .global-mobile-item').each(function () {
            $(this).toggleClass('hide');
        });
    });


    //Create Mobile friendly District Primary Nav
    if (site2 != "washington" && site2 != "truman" && site2 != "kennedy" && site2 != "malcolm-x" && site2 != "olive-harvey" && site2 != "daley" && site2 != "wright") {
        $('body').addClass('district');
        $('.header').prepend('<span class="main-link primary-nav-link">District Menu</span><ul class="district-mobile-primary-nav hide"><li class="primary-nav-link">Close</li><li class="links-title">District Menu</li><li class="back-button hide"><a href="#" class="back">Back</a></li></ul>');

        $('ul.topnav.primary-nav.district-nav li a.menu-item').each(function () {
            $(this).clone().appendTo('.district-mobile-primary-nav');
            $(this).next('div').find('ul li').clone().appendTo('.district-mobile-primary-nav');
        });

        $('.district-mobile-primary-nav a.menu-item').each(function () {
            $(this).wrap('<li class="district-mobile-primary-item" />');
        });



        $('.district-mobile-primary-item').each(function () {
            $(this).append('<ul class="district-mobile-primary-sub hide" />');
            $(this).nextUntil('.district-mobile-primary-item').addClass('sub-item').appendTo($(this).children('.district-mobile-primary-sub')).wrap('<li />');
        });

        $('.district-mobile-primary-item a.menu-item').click(function (e) {
            if ($(this).text() != 'Home') {
                e.preventDefault();
                $(this).parent('.district-mobile-primary-item').toggleClass('expanded');
                $(this).next('ul').toggleClass('hide');
                $('ul.district-mobile-primary-nav .district-mobile-primary-item').each(function () {
                    $(this).toggleClass('hide');
                });
            }
        });
    }



    //Create Mobile friendly College Primary Nav
    else {
        $('.header').prepend('<span class="main-link primary-nav-link">College Menu</span><ul class="college-mobile-primary-nav hide"><li class="primary-nav-link">Close</li><li class="links-title">College Menu</li><li class="back-button hide"><a href="#" class="back">Back</a></li></ul>');

        $('ul.topnav.primary-nav.college-nav li a.menu-item').each(function () {
            $(this).clone().appendTo('.college-mobile-primary-nav');
            $(this).next('div').find('ul li').clone().appendTo('.college-mobile-primary-nav');
        });

        $('.college-mobile-primary-nav a.menu-item').each(function () {
            $(this).wrap('<li class="college-mobile-primary-item" />');
        });



        $('.college-mobile-primary-item').each(function () {
            $(this).append('<ul class="college-mobile-primary-sub hide" />');
            $(this).nextUntil('.college-mobile-primary-item').addClass('sub-item').appendTo($(this).children('.college-mobile-primary-sub')).wrap('<li />');
        });

        $('.college-mobile-primary-item a.menu-item').click(function (e) {
            if ($(this).text() != 'Home') {
                e.preventDefault();
                $(this).parent('.college-mobile-primary-item').toggleClass('expanded');
                $(this).next('ul').toggleClass('hide');
                $('ul.college-mobile-primary-nav .college-mobile-primary-item').each(function () {
                    $(this).toggleClass('hide');
                });
            }
        });

    }


    //Expand menus when menu button is clicked
    $('.global-nav-link').click(function () {
        $('.global-mobile-nav').toggleClass('hide');
        $('.back-button').addClass('hide');
        $('.global-mobile-item.expanded').children('ul.global-mobile-sub').addClass('hide');
        $('.global-mobile-item.expanded').removeClass('expanded');
        $('ul.global-mobile-nav .global-mobile-item').each(function () {
            $(this).removeClass('hide');
        });
    });

    $('.primary-nav-link').click(function () {
        $('.back-button').addClass('hide');
        $('.district-mobile-primary-nav').toggleClass('hide');
        $('.district-mobile-primary-item.expanded').children('ul.district-mobile-primary-sub').addClass('hide');
        $('.district-mobile-primary-item.expanded').removeClass('expanded');
        $('ul.district-mobile-primary-nav .district-mobile-primary-item').each(function () {
            $(this).removeClass('hide');
        });

        $('.college-mobile-primary-nav').toggleClass('hide');
        $('.college-mobile-primary-item.expanded').children('ul.college-mobile-primary-sub').addClass('hide');
        $('.college-mobile-primary-item.expanded').removeClass('expanded');
        $('ul.college-mobile-primary-nav .college-mobile-primary-item').each(function () {
            $(this).removeClass('hide');
        });
    });

    //Add Media title to media section
    $('.right-col-block .gallery.WP a.PlayButton').each(function () {
        $(this).parent('.gallery.WP').parent('.content').parent('.right-col-block').prepend('<h2 class="smart-title">Media</h2>');
    });

    //Expand/Collapse Right Columns
    $('.right-col-block h2').each(function () {
        $(this).addClass('expanded collapsed');
        if ($(this).next('.content').children('.contact-info-detail').length == 0) {
            $(this).next('.content').addClass('collapsible');
        }
    });

    $('.right-col-block h2').click(function () {
        $(this).toggleClass('collapsed');
        $(this).nextAll('.content').toggleClass('collapsible');
    });

    //Expand/Collapse Right Column Events
    $('.right-col-block .Eventsholder .lower-title').each(function () {
        $(this).children('h2').addClass('expanded collapsed');
        $(this).nextAll('.Events').addClass('collapsible');
    });

    $('.right-col-block .Eventsholder .lower-title h2').click(function () {
        $(this).toggleClass('collapsed');
        $(this).parent('.lower-title').nextAll('.Events').toggleClass('collapsible');
    });

    //Expand/Collapse News
    $('.Newsholder .lower-title h2').addClass('expanded collapsed');
    $('.Newsholder .News').each(function () {
        $(this).addClass('collapsible');
    });

    $('.Newsholder .lower-title h2').click(function () {
        $(this).toggleClass('collapsed');
        $('.Newsholder .News').each(function () {
            $(this).toggleClass('collapsible');
        });
    });

    $('.QuickLinks').parent('.right-col-block.summary').addClass('collapsible');

    //Expand/Collapse Rich Text Section if an H2 is the first element	
    $('.right-col-block .rich-html').each(function () {
        var parentElement = $(this).find('.ms-rtestate-field');
        if ((parentElement).find(':first-child').length > 0) {
            if ((parentElement).find(':first-child').is('h2')) {
                parentElement.children().addClass('collapsible textblock');
                parentElement.children('h2').removeClass('collapsible textblock');

                $('.right-col-block .rich-html h2').click(function () {
                    //$('.right-col-block .rich-html .textblock').each(function () {
                    $(this).nextUntil('h2').toggleClass('collapsible');
                    //});
                });
            }

            //If the first element isn't an H2, then give the section an H2 called "Additional Information"
            /*else {
                $(this).children('.ms-rtestate-field').prepend('<h2 class="additional-info">Additional Information</h2>');
                $(this).children('.ms-rtestate-field').children().addClass('collapsible textblock');
                $(this).children('.ms-rtestate-field').children('h2.additional-info').removeClass('collapsible textblock');

                $('.right-col-block .rich-html h2.additional-info').click(function () {
                    $('.right-col-block .rich-html .textblock').each(function () {
                        $(this).toggleClass('collapsible');
                    });
                });
            }*/

            parentElement.children('h2').addClass('expanded collapsed');
            //parentElement.children('h2').click(function () { alert('hi'); $(this).toggleClass('collapsed'); });
        }
    });

    $('#contact-info .collapsible').removeClass('collapsible');
    $('#contact-info h2').removeClass('collapsed');
    $('#hours .collapsible').removeClass('expanded').removeClass('collapsible');
    $('#hours h2').removeClass('collapsed');

    //Move news for mobile
    $('#district-news').clone().appendTo('#main-section').attr('id', 'mobile-news');

    //Footer - Hide all "More Info" links
    $('.footer-links .footer-section.more-info li.dfwp-item ul li a').each(function () {
        $(this).parent('li').addClass('more-info-item');
    });

    if ($('.footer-links .footer-section.more-info li.dfwp-item ul li.smart-display.more-info-item').length == 0) {
        $('.footer-links').addClass('more-info-item');
    }

    /**
    * Outbound link tracking
    * 
    * This code largely based on examples from 
    * [Google Analytics Help](http://www.google.com/support/googleanalytics/bin/answer.py?answer=55527).
    */
    /*
    $('a:not([href*="' + document.domain + '"])):not([href*="javascript"])').click(function (event) {
        // Just in case, be safe and don't do anything
        if (typeof _gat == 'undefined') {
            return;
        }

        // Stop our browser-based redirect, we'll do that in a minute
        event.preventDefault();

        var link = $(this);
        var href = link.attr('href');
        var noProtocol = href.replace(/http[s]?:\/\//, '');

        // Track the event
        _gat._getTrackerByName()._trackEvent('Outbound Links', noProtocol);

        // Opening in a new window?
        if (link.attr('target') == '_blank') {
            //If we are opening a new window, go ahead and open it now
            //instead of in a setTimeout callback, so that popup blockers
            //don't block it. 
            window.open(href);
        }
        else {
            //If we're opening in the same window, we need to delay 
            //for a brief moment to ensure the _trackEvent has had time
            //to fire 
            setTimeout('document.location = "' + href + '";', 100);
        }
    });
    */

});
        