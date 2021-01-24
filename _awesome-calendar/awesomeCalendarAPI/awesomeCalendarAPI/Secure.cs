using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;

namespace awesomeCalendarAPI
{
    static class Secure
    {
        public static bool IsSecure(HttpRequestMessage Request)
        {

            // security HTTP header
            string key = "VWco7wDsB#RXIn7Dnu(LIjE55Nv43i_UVHBU5vYYRNln";
            IEnumerable<string> headerValues;
            var keyFilter = string.Empty;
            if (Request.Headers.TryGetValues("key", out headerValues))
            {
                // ALLOW - match key
                keyFilter = headerValues.FirstOrDefault();
            }
            if (keyFilter == key)
            {
                return true;
            }
            else
            {
                return false;
            }

            // Azure AD group membership

        }
    }
}