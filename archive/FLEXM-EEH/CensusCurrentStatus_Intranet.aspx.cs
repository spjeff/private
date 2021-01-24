using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Principal;

// CSOM
using OfficeDevPnP.Core;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;

public partial class CurrentStatus : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // CSOM
        // from https://www.c-sharpcorner.com/article/connect-to-sharepoint-online-site-with-app-only-authentication/
        // from https://piyushksingh.com/2018/12/26/register-app-in-sharepoint/

        // SPO Target
        string appid        = "f52372ad-5530-4c14-81e6-ac10ad9c5159";
        string appsecret    = "wCUTyGid7so+sTYYWgceyT7dfWm91tT8qMTMXTBqk4M=";
        string siteUrl      = "https://employee.edward.org/sites/team";
        string listTitle    = "Census";
        using (var context = new AuthenticationManager().GetAppOnlyAuthenticatedContext(siteUrl, appid, appsecret))
        {
            // Open SharePoint client web
            Web web = context.Web;
            context.Load(web);
            context.ExecuteQuery();

            // Open SharePoint client list
            List list = web.Lists.GetByTitle(listTitle);
            context.Load(list);
            context.ExecuteQuery();

            // CAML
            CamlQuery query = CamlQuery.CreateAllItemsQuery(1);
            ListItemCollection items = list.GetItems(query);
            context.Load(items);
            context.ExecuteQuery();

            // Items
            string CurrentCensus;
            foreach (ListItem listItem in items)
            {
                // We have all the list item data. For example, Title.
                CurrentCensus = listItem["Title"];
            }

            // Apply HTML display
            if (CurrentCensus == "Green - Inpatient beds available")
                Image1.ImageUrl = "~/Images/img_census_green.gif";

            if (CurrentCensus == "Yellow - Inpatient units approaching full occupancy")
                Image1.ImageUrl = "~/Images/img_census_yellow.gif";

            if (CurrentCensus == "Red - At capacity")
                Image1.ImageUrl = "~/Images/img_census_red.gif";
        }
    }
}