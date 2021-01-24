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

    var priority = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
	var id = ctx.CurrentItem.ID;

    // Return html element with appropriate color based on priority value
	return "<a style='padding:2px; background-color:#451f5c; color:white' href='/sites/cobtest/siteassets/cob/index.aspx#/?id="+id+"'>VIEW FORM</a>";
}

