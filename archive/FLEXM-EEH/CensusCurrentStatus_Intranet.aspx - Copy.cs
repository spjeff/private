using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Principal;

public partial class CurrentStatus : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        /*Declare and initialize a variable for the Lists Web service.*/
        Web_Reference.Lists listService = new Web_Reference.Lists();

        /*Authenticate the current user by passing their default 
        credentials to the Web service from the system credential cache.*/
        listService.Credentials = System.Net.CredentialCache.DefaultNetworkCredentials;

        /*Set the Url property of the service for the path to a subsite.*/
        listService.Url = "https://spclinical.edward.org/sites/digitalsigns/_vti_bin/lists.asmx";

        /* Instantiate an XmlDocument object */
        System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();

        /* Assign values to the string parameters of the GetListItems method, 
        using GUIDs for the listName and viewName variables. For listName, 
        using the list display name will also work, but using the list GUID 
        is recommended. For viewName, only the view GUID can be used. 
        Using an empty string for viewName causes the default view to be used.*/
        string listName = "{96A5C93D-3D86-493F-9484-D89150B3AAC1}";   //Current Sensus
        string viewName = "{40E5E0DD-0EDB-4570-A6C4-648C2E4884E4}";
        string rowLimit = "1";

        /*Use the CreateElement method of the document object to create 
        elements for the parameters that use XML.*/
        System.Xml.XmlElement query = xmlDoc.CreateElement("Query");
        System.Xml.XmlElement viewFields =
            xmlDoc.CreateElement("ViewFields");
        System.Xml.XmlElement queryOptions =
            xmlDoc.CreateElement("QueryOptions");

        /*To specify values for the parameter elements (optional), assign 
        CAML fragments to the InnerXml property of each element.*/
        query.InnerXml = "<Where><Eq><FieldRef Name=\"Title\" />" +
                "<Value Type=\"Text\">800f6a35-58d8-47fd-acba-67f777101c1c</Value></Eq></Where>";
        viewFields.InnerXml = "<FieldRef Name=\"Title\" />";
        queryOptions.InnerXml = "";

        /* Declare an XmlNode object and initialize it with the XML response 
        from the GetListItems method. The last parameter specifies the GUID 
        of the Web site containing the list. Setting it to null causes the 
        Web site specified by the Url property to be used.*/
        System.Xml.XmlNode nodeListItems = listService.GetListItems(listName, viewName, query, viewFields, rowLimit, queryOptions, null);

        /*Loop through each node in the XML response and display each item.*/
        string CurrentCensus = string.Empty;
        foreach (System.Xml.XmlNode listItem in nodeListItems)
        {
            if (listItem.ChildNodes.Count >= 1)
            {
                if (listItem.ChildNodes[1].Name == "z:row")
                {
                    if (listItem.ChildNodes[1].Attributes.Count > 0)
                    {
                        // SPField = "Current Census Level"
                        if (listItem.ChildNodes[1].Attributes["ows_Current_x0020_Census_x0020_Level"] != null)
                        {
                            CurrentCensus = listItem.ChildNodes[1].Attributes["ows_Current_x0020_Census_x0020_Level"].Value;
                            break;
                        }
                    }
                }
            }
        }
        //Response.Write(WindowsIdentity.GetCurrent().Name.ToString());
        //Response.Write("<br />");
        //Response.Write(CurrentCensus);

        if (CurrentCensus == "Green - Inpatient beds available")
            Image1.ImageUrl = "~/Images/img_census_green.gif";

        if (CurrentCensus == "Yellow - Inpatient units approaching full occupancy")
            Image1.ImageUrl = "~/Images/img_census_yellow.gif";

        if (CurrentCensus == "Red - At capacity")
            Image1.ImageUrl = "~/Images/img_census_red.gif";
    }
}