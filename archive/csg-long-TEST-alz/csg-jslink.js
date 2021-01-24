// List View – Priority Color Sample
// Muawiyah Shannak , @MuShannak

(function () {

    // Create object that have the context information about the field that we want to change it's output render 
    var priorityFiledContext = {};
    priorityFiledContext.Templates = {};
    priorityFiledContext.Templates.Fields = {
        // Apply the new rendering for Priority field on List View
        "Title": { "View": priorityFiledTemplate }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(priorityFiledContext);

})();

// This function provides the rendering logic for list view
function priorityFiledTemplate(ctx) {

    var name = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
	var id = ctx.CurrentItem.ID;

    // Return html element with appropriate color based on priority value
	return "<b>" + name + "</b>&nbsp;<div style='padding:5px; background-color:#007FFF; color:white; white-space:nowrap'><a style='color:white; white-space:nowrap' href='/sites/alz/SiteAssets/index.aspx#/?id="+id+"'><img src='/_layouts/images/edititem.gif' border=0 style='padding-right:10px'>VIEW PATIENT INFUSIONS</a></div>";
}

