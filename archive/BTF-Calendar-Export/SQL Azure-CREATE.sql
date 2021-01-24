/****** Object:  Table [dbo].[ExemptEmployees]    Script Date: 7/26/2020 11:23:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ExemptEmployees](
	[address] [varchar](255) NULL,
	[isExempt] [bit] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ExemptEmployees] ADD  CONSTRAINT [DF_Exempt_isExempt]  DEFAULT ((0)) FOR [isExempt]
GO



/****** Object:  Table [dbo].[Events]    Script Date: 7/26/2020 11:23:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Events](
	[id] [varchar](8000) NULL,
	[subject] [varchar](8000) NULL,
	[bodyPreview] [varchar](8000) NULL,
	[start] [datetime] NULL,
	[end] [datetime] NULL,
	[attend] [varchar](8000) NULL,
	[attendeesCount] [int] NULL,
	[organizername] [varchar](8000) NULL,
	[organizeraddress] [varchar](8000) NULL,
	[upn] [varchar](255) NULL,
	[totalExemptHours] [float] NULL,
	[totalOtherHours] [float] NULL
) ON [PRIMARY]
GO



