using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.UI.WebControls;

namespace awesomeCalendarAPI.Controllers
{
    // CORS - Enable HTTP calls from any source URL
    //      - To allow specific caller DNS domains only use this syntax:
    //        (origins: "http://domain1, http://domain1",
    [EnableCors(origins: "*",
        headers: "*",
        methods: "*")]
    public class EventsController : ApiController
    {
        // GET api/values
        public DataTable Get()
        {
            if (Secure.IsSecure(Request))
            {
                //string sqlServer = "awesome-calendar.database.windows.net";
                //string sqlUser = "awesome-calendar-sa";
                //string sqlPass = "fVRpmHbxARhBz2d";
                //string sqlDatabase = "awesome-calendar";

                string sqlServer = "spjeff-sql.database.windows.net";
                string sqlUser = "spjeff-sa";
                string sqlPass = "ubrjE57fTwRi7mAdI5g6";
                string sqlDatabase = "msupdates5";

                string sqlConn = String.Format("Server = {0}; Database = {1}; User Id = {2}; Password = {3}", sqlServer, sqlDatabase, sqlUser, sqlPass);
                SqlConnection conn = new SqlConnection(sqlConn);
                string tsql = String.Format("SELECT * FROM [dbo].[Events]");
                SqlCommand cmd = new SqlCommand(tsql, conn);
                DataTable results = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(results);

                return results;
            } else
            {
                return null;
            }
        }

        // POST api/values
        public void Post([FromBody] List<EventClass> events)
        {

            // List<EventClass>events
            // from https://stackoverflow.com/questions/12939501/insert-into-c-sharp-with-sqlcommand

            string sqlServer = "spjeff-sql.database.windows.net";
            string sqlUser = "spjeff-sa";
            string sqlPass = "ubrjE57fTwRi7mAdI5g6";
            string sqlDatabase = "msupdates5";

            string sqlConn      = String.Format("Server = {0}; Database = {1}; User Id = {2}; Password = {3}", sqlServer, sqlDatabase, sqlUser, sqlPass);
            SqlConnection conn  = new SqlConnection(sqlConn);
            conn.Open();
            if (events.Count > 0)
            {
                foreach (EventClass e in events)
                {
                    // CHECK FOUND
                    string tsql = String.Format("SELECT COUNT(*) FROM [dbo].[Events] WHERE [GlobalAppointmentID]='{0}'", e.GlobalAppointmentID);
                    SqlCommand cmd = new SqlCommand(tsql, conn);
                    SqlDataReader dr = cmd.ExecuteReader();
                    dr.Read();
                    int count = (int)dr[0];
                    dr.Close();
                    cmd.Dispose();


                    // INSERT
                    if (count == 0 && e.Subject != "OOO" && !e.Subject.EndsWith("-OOO") && !e.Subject.EndsWith(" OOO"))
                    {
                        // tsql = String.Format("INSERT INTO [dbo].[Events]([Subject],[GlobalAppointmentID],[PC]) VALUES ('{0}','{1}','{2}')", e.Subject, e.GlobalAppointmentID, e.PC);
                        // from https://social.msdn.microsoft.com/Forums/en-US/57204ec7-b075-4d4c-8587-2eb53648441d/escape-a-sql-string-programmatically?forum=adodotnetdataproviders


                        //tsql = "INSERT INTO [dbo].[Events]([Subject],[GlobalAppointmentID],[PC]) VALUES (@Subject,@GlobalAppointmentID,@PC)";


                        tsql = "INSERT INTO [dbo].[Events] ([Start],[End],[StartUTC],[EndUTC],[Subject],[Location],[Body],[IsRecurring],[Organizer],[OptionalAttendees],[RequiredAttendees],[ResponseStatus],[AllDayEvent],[ReminderMinutesBeforeStart],[RecurrenceState],[PC],[GlobalAppointmentID]) VALUES (@Start,@End,@StartUTC,@EndUTC,@Subject,@Location,@Body,@IsRecurring,@Organizer,@OptionalAttendees,@RequiredAttendees,@ResponseStatus,@AllDayEvent,@ReminderMinutesBeforeStart,@RecurrenceState,@PC,@GlobalAppointmentID)";
                        cmd = new SqlCommand(tsql, conn);

                        cmd.Parameters.AddWithValue("@Start", e.Start);
                        cmd.Parameters.AddWithValue("@StartUTC", e.StartUTC);
                        cmd.Parameters.AddWithValue("@End", e.End);
                        cmd.Parameters.AddWithValue("@EndUTC", e.EndUTC);
                        cmd.Parameters.AddWithValue("@Categories", e.Categories);
                        cmd.Parameters.AddWithValue("@Subject", e.Subject == null ? "" : e.Subject.Truncate(8000));
                        cmd.Parameters.AddWithValue("@Location", e.Location == null ? "" : e.Location.Truncate(8000));
                        cmd.Parameters.AddWithValue("@Body", e.Body == null ?  "" : e.Body.Truncate(8000));
                        cmd.Parameters.AddWithValue("@IsRecurring", e.IsRecurring);
                        cmd.Parameters.AddWithValue("@Organizer", e.Organizer == null ? "" : e.Organizer.Truncate(8000));
                        cmd.Parameters.AddWithValue("@OptionalAttendees", e.OptionalAttendees == null ? "" : e.OptionalAttendees.Truncate(8000)  );
                        cmd.Parameters.AddWithValue("@RequiredAttendees", e.RequiredAttendees == null ? "" : e.RequiredAttendees.Truncate(8000)  );
                        cmd.Parameters.AddWithValue("@ResponseStatus", e.ResponseStatus);
                        cmd.Parameters.AddWithValue("@AllDayEvent", e.AllDayEvent);
                        cmd.Parameters.AddWithValue("@ReminderMinutesBeforeStart", e.ReminderMinutesBeforeStart);
                        cmd.Parameters.AddWithValue("@RecurrenceState", e.RecurrenceState);
                        cmd.Parameters.AddWithValue("@PC", e.PC);
                        cmd.Parameters.AddWithValue("@GlobalAppointmentID", e.GlobalAppointmentID);


                        // Run
                        cmd.ExecuteNonQuery();
                        cmd.Dispose();
                    }


                    // DELETE
                    tsql = String.Format("SELECT * FROM [dbo].[Events] WHERE [PC]='{0}'", e.PC);
                    SqlDataAdapter adapter = new SqlDataAdapter(tsql, conn);
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);
   
                    foreach (DataRow row in dt.Rows) { 
                        List<EventClass> found = events.FindAll(o => o.GlobalAppointmentID.Equals(row["GlobalAppointmentID"]));
                        if (found.Count == 0)
                        {
                            tsql = String.Format("DELETE FROM [dbo].[Events] WHERE [GlobalAppointmentID]='{0}'", row["GlobalAppointmentID"]);
                            cmd = new SqlCommand(tsql, conn);
                            cmd.ExecuteNonQuery();
                            cmd.Dispose();
                        }
                    }
                    dr.Close();
                    cmd.Dispose();

                }
            }

            // Clean
            conn.Close();
            conn.Dispose();

        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
