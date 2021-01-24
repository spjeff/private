// COB_Dashboard.js

function addCard(parentSelector, id, FileLeafRef, daysStage, daysCreated, CalcLabel, RequestNumber, sourceURL, reportType, formStatus, dueDateDays) {
	//add one card to canvas
	var clone = $("#cardTemplate").clone();
	clone.attr('id','card' + id);
	var obj = clone.appendTo(parentSelector);
	obj.find("#fieldDaysCreated").text(daysCreated + ' days');
	obj.find("#fieldDaysStage").text(daysStage + ' days');
	
    //apply CSS styling
    obj.find("#fieldFileLeafRef").text(FileLeafRef);
    obj.find("#sourceURL").text(sourceURL);
    obj.find("#fieldRequestNumber").html(RequestNumber);
    obj.find("#fieldReportType").html(reportType);
    obj.find("#fieldCalcLabel").html(CalcLabel);

    //default wait times
    var greenThreshold = 2;
    var yellowThreshold = 3;

    //longer wait time for Review stages
    if (formStatus == "newReview" || formStatus == "reviewAssigned") {
        greenThreshold = 11;
        yellowThreshold = 12;
    }

    //vendor report based on Due Date (outside report / bid lead time)
    if (formStatus == "vendorReport") {

        //Due Date - drives Vendor Report
        obj.find("#fieldDaysStage").text(dueDateDays + ' days');
        if (dueDateDays >= 0) {
            obj.find("#fieldDaysStage").parent().css('background-color', '#00FF00'); //green
        } else {
            if (dueDateDays < 0) {
                obj.find("#fieldDaysStage").parent().css('background-color', '#FFFF00'); //yellow
            }
            if (dueDateDays < -2) {
                obj.find("#fieldDaysStage").parent().css('background-color', '#FF0000'); //red
                obj.find("#fieldDaysStage").parent().css('color', '#FFFFFF'); //red
            }
        }

    } else {
        //all other status types
        if (daysStage < greenThreshold) {
	        obj.find("#fieldDaysStage").parent().css('background-color', '#00FF00'); //green
	    } else {
	        if (daysStage < yellowThreshold) {
	            obj.find("#fieldDaysStage").parent().css('background-color', '#FFFF00'); //yellow
	        } else {
	            obj.find("#fieldDaysStage").parent().css('background-color', '#FF0000'); //red
	            obj.find("#fieldDaysStage").parent().css('color', '#FFFFFF'); //red
	        }
	    }
    }
}
function cardClick(obj) {
	//open document to view full screen
	var id = obj.id;
	var FileLeafRef = $('#' + id).find('#fieldFileLeafRef').text();
	var SoureURL = $('#' + id).find('#sourceURL').text();
	var url = '/_layouts/FormServer.aspx?XmlLocation=/Data/' + FileLeafRef + '&ClientInstalled=false&Source=' + SoureURL + '&DefaultItemOpen=1';
	document.location.href = url;
}