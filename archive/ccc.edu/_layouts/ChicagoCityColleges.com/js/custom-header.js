<!-- Adds Sitename to the Body tag -->
            var pathname = window.location.pathname.toLowerCase();
            var myArray = pathname.split('colleges');
            var site = "";
            var site2="";
            if (myArray.length>1)
            {
               site = pathname.split('colleges')[1];
               site2 = site.split('../index.html')[1];
               if(site2 != "washington" && site2 != "truman" && site2 != "kennedy" && site2 != "malcolm-x" && site2 != "olive-harvey" && site2 != "daley" && site2 != "wright")
               { site2 = ""; }
            }

	function GetStyle()
		{
            var currentstyle2 = document.body.getAttribute("class");
            var newstyle2 = currentstyle2 + " " + "loaded2";
            document.body.setAttribute("class", newstyle2);

			var currentstyle = document.body.getAttribute("class");
            if (site2 == "") {var newstyle = currentstyle + " loaded";}
            else {
			var newstyle = currentstyle + " " + site2 + " loaded";
            }
            document.body.setAttribute("class", newstyle);
        }


function disableMarkupPasteForRTE() {
      

    Type.registerNamespace("RTE"); 

    if (RTE) {
        if (RTE.RichTextEditor != null) {
            RTE.RichTextEditor.paste = function () { RTE.Cursor.paste(true); }
            // Handle Ctrl+V short cut options in rich text editor
            RTE.Cursor.$3C_0 = true;
        }
    }
   
}

function programPage () {
	if ($('.program-details').length) {
        $('body').addClass('program-details');
    }
}