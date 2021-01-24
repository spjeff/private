USE [devblue]
GO

CREATE VIEW BOXForward AS 
SELECT D.Fullname, L.TargetPath+'/'+REPLACE(SUBSTRING(D.FullnameClean,LEN(D.Dept)+LEN(D.Region)+3, LEN(D.FullnameClean) - LEN(D.Dept)+LEN(D.Region)),'\','/') AS URL FROM (
SELECT  C.Dept, SUBSTRING(C.RegionTemp, 1, CHARINDEX('\',C.RegionTemp)-1) AS Region, C.Fullname ,C.FullnameClean
FROM (
	SELECT B.* FROM (
		SELECT
		SUBSTRING(A.FullnameClean, 1, CHARINDEX('\',A.FullnameClean)-1) AS Dept,
		SUBSTRING(A.FullnameClean, CHARINDEX('\',A.FullnameClean)+1, LEN(A.FullnameClean) - CHARINDEX('\',A.FullnameClean)) AS RegionTemp,
		A.Fullname,
		A.FullnameClean
		FROM (
			SELECT REPLACE([Fullname],'E:\BOX\EML Structure\','') AS FullnameClean,Fullname FROM [dbo].[BOX]
		) AS A
	) AS B
) AS C
) AS D

INNER JOIN MSTeams_Lookup AS L 
ON L.SourcePath = (D.Dept+'\'+D.Region)
