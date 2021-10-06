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
    public class NotesController : ApiController
    {

        // GET api/values
        //public DataTable Get()
        //{
            //if (Secure.IsSecure(Request))
            //{
            //    string sqlServer = "spjeff-sql.database.windows.net";
            //    string sqlUser = "spjeff-sa";
            //    string sqlPass = "ubrjE57fTwRi7mAdI5g6";
            //    string sqlDatabase = "msupdates5";

            //    string sqlConn = String.Format("Server = {0}; Database = {1}; User Id = {2}; Password = {3}", sqlServer, sqlDatabase, sqlUser, sqlPass);
            //    SqlConnection conn = new SqlConnection(sqlConn);
            //    string tsql = String.Format("SELECT * FROM [dbo].[Notes]");
            //    SqlCommand cmd = new SqlCommand(tsql, conn);
            //    DataTable results = new DataTable();
            //    SqlDataAdapter da = new SqlDataAdapter(cmd);
            //    da.Fill(results);

            //    return results;
            //} else
            //{
            //    return null;
            //}
        //}

        // POST api/values
        public void Post([FromBody] NoteClass notes)
        {

            // List<EventClass>events
            // from https://stackoverflow.com/questions/12939501/insert-into-c-sharp-with-sqlcommand

            string sqlServer = "spjeff-sql.database.windows.net";
            string sqlUser = "spjeff-sa";
            string sqlPass = "ubrjE57fTwRi7mAdI5g6";
            string sqlDatabase = "msupdates5";

            string sqlConn = String.Format("Server = {0}; Database = {1}; User Id = {2}; Password = {3}", sqlServer, sqlDatabase, sqlUser, sqlPass);
            SqlConnection conn = new SqlConnection(sqlConn);
            conn.Open();
            if (notes != null)
            {
                NoteClass e = notes;
                //foreach (NoteClass e in notes)
                //{
                // CHECK FOUND
                string tsql = String.Format("DELETE FROM [dbo].[Notes] WHERE [PC]='{0}' AND [WeekEnding]='{1}'", e.PC, e.WeekEnding);
                SqlCommand cmd = new SqlCommand(tsql, conn);
                cmd.ExecuteNonQuery();
                cmd.Dispose();

                //dr.Read();
                //int count = (int)dr[0];
                //dr.Close();



                //// INSERT
                //if (count == 0)
                //{
                // tsql = String.Format("INSERT INTO [dbo].[Events]([Subject],[GlobalAppointmentID],[PC]) VALUES ('{0}','{1}','{2}')", e.Subject, e.GlobalAppointmentID, e.PC);
                // from https://social.msdn.microsoft.com/Forums/en-US/57204ec7-b075-4d4c-8587-2eb53648441d/escape-a-sql-string-programmatically?forum=adodotnetdataproviders

                tsql = "INSERT INTO [dbo].[Notes] ([PC],[WeekEnding],[Notes],[Subject],[Body],[Created]) VALUES (@PC,@WeekEnding,@Notes,@Subject,@Body,@Created)";
                cmd = new SqlCommand(tsql, conn);
                cmd.Parameters.AddWithValue("@PC", e.PC);
                cmd.Parameters.AddWithValue("@WeekEnding", e.WeekEnding);
                cmd.Parameters.AddWithValue("@Notes", e.Notes);
                cmd.Parameters.AddWithValue("@Subject", e.Subject);
                cmd.Parameters.AddWithValue("@Body", e.Body);
                cmd.Parameters.AddWithValue("@Created", DateTime.Now);

                // Run
                cmd.ExecuteNonQuery();
                cmd.Dispose();
                //}


                //// DELETE
                //tsql = String.Format("SELECT * FROM [dbo].[Notes] WHERE [PC]='{0}'", e.PC);
                //SqlDataAdapter adapter = new SqlDataAdapter(tsql, conn);
                //DataTable dt = new DataTable();
                //adapter.Fill(dt);

                //foreach (DataRow row in dt.Rows) { 
                //    List<EventClass> found = notes.FindAll(o => o.GlobalAppointmentID.Equals(row["GlobalAppointmentID"]));
                //    if (found.Count == 0)
                //    {
                //        tsql = String.Format("DELETE FROM [dbo].[Notes] WHERE [GlobalAppointmentID]='{0}'", row["GlobalAppointmentID"]);
                //        cmd = new SqlCommand(tsql, conn);
                //        cmd.ExecuteNonQuery();
                //        cmd.Dispose();
                //    }
                //}
                //dr.Close();
                //cmd.Dispose();

                //}
            }

            // Clean
            conn.Close();
            conn.Dispose();
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}

