//<![CDATA[
$(document).ready(function () {

    $('.home-link').append('<a href="/colleges/' + site2 + '" class="menu-item active">Home</a>');

    //If there is a PDF on the page, load a message to download PDF reader.
    if ($('a[href $= ".pdf"]').length) { $('#main-column').append('<a href="http://get.adobe.com/reader/" class="adobe-pdf-link" target="_blank">Download Adobe Acrobat Reader</a>'); }

    if (site2 == "") { $('.logo').append('<a href="/" class="site-logo" title="Site Logo"><img alt="CCC Logo" src="../_layouts/images/ChicagoCityColleges.com/logo.png" /></a>'); }
    else {
        $('.logo').append('<a href="/colleges/' + site2 + '" class="site-logo" title="Site Logo"><img alt="College Logo" src="/_layouts/images/ChicagoCityColleges.com/' + site2 + '/logo.png" /></a>');
    }

    //When Search button is clicked, submit search query.
    $("#search-button-global").click(function (e) {
        if (site2 == "") {
            e.preventDefault();
            var searchvalue = $('.search-text-field').val();
            var searchurl = "/Pages/Search-Results.aspx?k=" + $.trim($('.search-text-field').val()).replace(/ /g, "+");
            $(location).attr('href', searchurl);
        } else {
            e.preventDefault();
            var searchvalue = $('.search-text-field').val();
            var searchurl = "/colleges/" + site2 + "/Pages/Search-Results.aspx?k=" + $.trim($('.search-text-field').val()).replace(/ /g, "+");
            $(location).attr('href', searchurl);
        }

        //When Search button is clicked, change the class.
        var $this = $(this);
        if (!$this.hasClass('noclick'))
            $('.noclick').toggleClass("noclick").toggleClass("clicked");
        $this.toggleClass("noclick").toggleClass("clicked");
    });

    //When Enter is pressed do the same thing as above        
    $('.search-text-field').keypress(function (e) {
        if (e.which == 13 && site2 != "") {
            e.preventDefault();
            var searchvalue = $('.search-text-field').val();
            var searchurl = "/colleges/" + site2 + "/Pages/Search-Results.aspx?k=" + $.trim($('.search-text-field').val()).replace(/ /g, "+");
            $(location).attr('href', searchurl);

            //When Enter is press, change the class.
            var $this = $(this);
            if (!$this.hasClass('noclick'))
                $('.noclick').toggleClass("noclick").toggleClass("clicked");
            $this.toggleClass("noclick").toggleClass("clicked");
        } else if (e.which == 13 && site2 == "") {
            e.preventDefault();
            var searchvalue = $('.search-text-field').val();
            var searchurl = "/Pages/Search-Results.aspx?k=" + $.trim($('.search-text-field').val()).replace(/ /g, "+");
            $(location).attr('href', searchurl);

            //When Enter is press, change the class.
            var $this = $(this);
            if (!$this.hasClass('noclick'))
                $('.noclick').toggleClass("noclick").toggleClass("clicked");
            $this.toggleClass("noclick").toggleClass("clicked");
        }

    });
});
//]]>