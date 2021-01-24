using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace awesomeCalendarAPI
{
    public static class StringExtensions
    {
        public static string Truncate(this string value, int maxLength)
        {
            return value?.Substring(0, Math.Min(value.Length, maxLength));
        }
    }
}