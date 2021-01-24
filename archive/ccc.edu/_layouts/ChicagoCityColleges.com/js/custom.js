

function showHideDiv(parentDiv, childDiv)
{
if (parentDiv.parentNode.getElementsByTagName("div")[childDiv].style.display == 'block')
        parentDiv.parentNode.getElementsByTagName("div")[childDiv].style.display = 'none';
else
        parentDiv.parentNode.getElementsByTagName("div")[childDiv].style.display = 'block';
}

function formatDate2(controlID, controlID2, contentType) {
    //the second para is optional

    if (contentType == "Event") {
        formatDate3(controlID, contentType);
        formatDate3(controlID2, contentType);
    }

    else {
        formatDate(controlID);
        formatDate(controlID2);
    }

    var d1 = "";
    if (controlID != "")
        d1 = document.getElementById(controlID).innerHTML;
    var d2 = "";
    if (controlID2 != "")
        d2 = document.getElementById(controlID2).innerHTML;

    if (d1 == "") {
        document.getElementById(controlID).innerHTML = "";
        document.getElementById(controlID2).innerHTML = "";
    }
    else if (d2 != "") {
        if (d1 != d2)
            document.getElementById(controlID2).innerHTML = " - " + d2;
        else
            document.getElementById(controlID2).innerHTML = "";
    }


}

function formatDate3(controlID, contentType) {
    formatDate_Year2(controlID, "true");
}

function formatDate(controlID) {
    formatDate_Year(controlID, "true");
}


function formatDate_Year(controlID, hasYear) {
    //change the format from mm/dd/yyyy HH:MM:SS AM to MMM dd, yyyy
    if (controlID != "") {
        var monthFull = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

        var dt = document.getElementById(controlID).innerHTML;


        if (dt != "") {
            var d = new Date(dt);
            var dy = d.getDate();
            var mt = d.getMonth();
            var yr = d.getFullYear();

            if (isNaN(dy) == true)
                document.getElementById(controlID).innerHTML = "";
            else if (hasYear == "true")
                document.getElementById(controlID).innerHTML = monthFull[mt] + " " + dy + ", " + yr;
            else
                document.getElementById(controlID).innerHTML = monthFull[mt] + " " + dy;
        }
        else
            document.getElementById(controlID).innerHTML = "";
    }

}

function formatDate_Year2(controlID, hasYear) {
    //change the format from mm/dd/yyyy HH:MM:SS AM to MMM dd, yyyy
    if (controlID != "") {
        var monthFull = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var dayFull = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");

        var dt = document.getElementById(controlID).innerHTML;


        if (dt != "") {
            var d = new Date(dt);
            var dy = d.getDate();
            var df = dayFull[d.getDay()];
            var mt = d.getMonth();
            var yr = d.getFullYear();

            if (isNaN(dy) == true)
                document.getElementById(controlID).innerHTML = "";
            else if (hasYear == "true")
                document.getElementById(controlID).innerHTML = df + ", " + monthFull[mt] + " " + dy + ", " + yr;
            else
                document.getElementById(controlID).innerHTML = monthFull[mt] + " " + dy;
        }
        else
            document.getElementById(controlID).innerHTML = "";
    }

}


function IndexChange(sel, primaryImage, primaryYoutube) {
    //alert("OnChange event");
    var _ddl = document.getElementById(sel);
    //alert(_ddl.options[_ddl.selectedIndex].text);

    var selection = _ddl.options[_ddl.selectedIndex].text;

    if (selection == "Primary Image")
        document.getElementById(primaryImage).style.display = "";
    else
        document.getElementById(primaryImage).style.display = "none";


    if (selection == "Youtube Video")
        document.getElementById(primaryYoutube).style.display = "";
    else
        document.getElementById(primaryYoutube).style.display = "none";
}

function mediaInit(sel, primaryImage, primaryYoutube) {
    IndexChange(sel, primaryImage, primaryYoutube);
}


function ShowElement(ele_ID) {
    try {
        if (ele_ID != "") {
            document.getElementById(ele_ID).style.display = "";
        }
    }
    catch (err) { var dummy = "dummy"; }
}

function ShowAllLink(ele_Name) {

    var names = document.getElementsByName(ele_Name + "ShowAll");
    if (names.length > 0) {

        ShowElement(ele_Name + "ViewAll");
    }
}

//for photo gallery, deal with two parts
function goChild() {
    var curr = top.location.href.toLowerCase();
    if (curr.indexOf("-moss-") > 0)
        goChildLocal("");
    else if (curr.indexOf("6.170.72/index.html") > 0)
        goChildTest("");
    else if (curr.indexOf("6.170.114/index.html") > 0)
        goChildStaging("");
    else if (curr.indexOf("6.170.79/index.html") > 0)
        goChildProduction("");
    else
        goChildProduction("");
}
//for site content browsing, deal with one SP control
function goChildWithDivID(divID) {
    var curr = top.location.href.toLowerCase();
    if (curr.indexOf("-moss-") > 0)
        goChildLocal(divID);
    else if (curr.indexOf("6.170.72/index.html") > 0)
        goChildTest(divID);
    else if (curr.indexOf("6.170.114/index.html") > 0)
        goChildStaging(divID);
    else if (curr.indexOf("6.170.79/index.html") > 0)
        goChildProduction(divID);
    else
        goChildProduction(divID);
}
function goChildProduction(parentDivID) {
    var child = window.open("../_layouts/chicagocitycolleges.com/AssetPortalBrowser229b2.html?MDWeb=bc266a27-2bfa-47da-8d37-b5af1db7c746", "Picker", "scrollbars=0", false);
    if (parentDivID != "")
        child.document.getElementById("parentDivID").value = parentDivID;
    child.focus();
}
function goChildStaging(parentDivID) {
    var child = window.open("../_layouts/chicagocitycolleges.com/AssetPortalBrowser229b2.html?MDWeb=bc266a27-2bfa-47da-8d37-b5af1db7c746", "Picker", "scrollbars=0", false);
    if (parentDivID != "")
        child.document.getElementById("parentDivID").value = parentDivID;
    child.focus();
}
function goChildTest(parentDivID) {
    var child = window.open("../_layouts/chicagocitycolleges.com/AssetPortalBrowser229b2.html?MDWeb=bc266a27-2bfa-47da-8d37-b5af1db7c746", "Picker", "scrollbars=0", false);
    if (parentDivID != "")
        child.document.getElementById("parentDivID").value = parentDivID;
    child.focus();
}
function goChildLocal(parentDivID) {
    var child = window.open("../_layouts/chicagocitycolleges.com/AssetPortalBrowser23e81.html?MDWeb=99ced550-5afe-4862-9f26-7068e8d9de21", "Picker", "scrollbars=0", false);
    if (parentDivID != "")
        child.document.getElementById("parentDivID").value = parentDivID;
    child.focus();
}
//for photo gallery, deal with two parts
function doClear() {
    document.getElementById("returnURLHidden").innerHTML = "Your path:  ";
    document.getElementById("returnURL").getElementsByTagName('input')[0].value = "";
}
//for site content browsing, deal with one SP control
function doClearSelection(divID) {
    document.getElementById(divID).getElementsByTagName('input')[0].value = "";
}