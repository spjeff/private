USE [awesome-calendar]
GO

SELECT [Start]
      ,[End]
      ,[StartUTC]
      ,[EndUTC]
      ,[Subject]
      ,[Location]
      ,[RTFBody]
      ,[Body]
      ,[IsRecurring]
      ,[Organizer]
      ,[Recipients]
      ,[OptionalAttendees]
      ,[RequiredAttendees]
      ,[ResponseStatus]
      ,[AllDayEvent]
      ,[ReminderMinutesBeforeStart]
      ,[RecurrenceState]
      ,[PC]
      ,[GlobalAppointmentID]
  FROM [dbo].[Events]

SELECT distinct pc from events 

--delete from events where pc='WAZP-P0047'

