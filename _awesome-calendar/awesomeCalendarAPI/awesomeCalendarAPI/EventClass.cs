using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace awesomeCalendarAPI
{
    public class EventClass
    {

        public DateTime Start;
        public DateTime End;
        public DateTime StartUTC;
        public DateTime EndUTC;
        public string Categories;
        public string Subject;
        public string Location;
        public string RTFBody;
        public string Body;
        public Boolean IsRecurring;
        public string Organizer;
        public string Recipients;
        public string OptionalAttendees;
        public string RequiredAttendees;
        public string ResponseStatus;
        public string AllDayEvent;
        public int ReminderMinutesBeforeStart;
        public string RecurrenceState;
        public string PC;
        public string GlobalAppointmentID;

    }
}