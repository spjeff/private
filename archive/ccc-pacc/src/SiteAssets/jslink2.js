// List View – Priority Color Sample
// Muawiyah Shannak , @MuShannak

(function () {

    // Create object that have the context information about the field that we want to change it's output render 
    var priorityFiledContext2 = {};
    priorityFiledContext2.Templates = {};
    priorityFiledContext2.Templates.Fields = {
        // Apply the new rendering for Priority field on List View
        "Title": { "View": priorityFiledTemplate2 }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(priorityFiledContext2);

})();

// This function provides the rendering logic for list view
function priorityFiledTemplate2(ctx) {

    var name = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
	var id = ctx.CurrentItem.ID;

    // Return html element with appropriate color based on priority value
	return "<div style='padding:5px; background-color:#007FFF; color:white; white-space:nowrap'><a style='color:white; white-space:nowrap' href='/sites/PAC/automated/dev/SiteAssets/index.aspx#/?id="+id+"'><img src='/_layouts/images/edititem.gif' border=0 style='padding-right:10px'>VIEW PACC</a></div>";
}

