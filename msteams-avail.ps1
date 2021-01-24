while (1) {
  sleep 30
  "."


  Invoke-WebRequest -Uri "https://presence.teams.microsoft.com/v1/me/forceavailability/" `
-Method "PUT" `
-Headers @{
"method"="PUT"
  "authority"="presence.teams.microsoft.com"
  "scheme"="https"
  "path"="/v1/me/forceavailability/"
  "x-ms-session-id"="c365162d-0865-e5cf-6d94-7b96389e4a78"
  "x-ms-endpoint-id"="7b61eea4-0482-436b-8d40-e83cf2cd7dd8"
  "behavioroverride"="redirectAs404"
  "x-ms-scenario-id"="575"
  "x-ms-client-env"="pckgsvc-prod-c2-usnc-02"
  "x-ms-client-type"="web"
  "authorization"="Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik1MOElkUl91RnlTNmNIMm9lSWkzM0VLcTAtTFdnVGlqdTlIdEpDbEpXVjQiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiJodHRwczovL3ByZXNlbmNlLnRlYW1zLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZmZhNzIwNzAtNjNmYS00OTg5LTk3YzAtMmQ5MjBjZmJiODVjLyIsImlhdCI6MTYwMDQzNzc5NywibmJmIjoxNjAwNDM3Nzk3LCJleHAiOjE2MDA0NDUyOTcsImFjciI6IjEiLCJhaW8iOiJBV1FBbS84UUFBQUE2eVNlZmQ1WmNrazBCMm04M3R3OWxOdUgvdUNuVHFvVkFiU3JIWWw1d05nTnE1OE9Ua0pVM1IyeVBMeCt1d2hpbEh5Ulk5QnZ0VGx3ZEtoU2dGYzZlcUJ1c3M5NTNEVzBSR2JNK2hSalFMbjcwWGViWERTNzFEU1Q0bmZDR1ZsVCIsImFsdHNlY2lkIjoiNTo6MTAwMzIwMDA3MkQyQzk4MSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI1ZTNjZTZjMC0yYjFmLTQyODUtOGQ0Yi03NWVlNzg3ODczNDYiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6ImplZmYuam9uZXNAZGVmaW5pdGl2ZWxvZ2ljLmNvbSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Y1NzI3Mjk2LTViNDktNGIzMS1hNTQ0LWQxZDg1ZDY0YTUyOS8iLCJpcGFkZHIiOiI3My41MC42MS4xNjYiLCJuYW1lIjoiSm9uZXMsIEplZmYiLCJvaWQiOiIwNDMwMjFkZS1mMTIwLTRmN2UtYjc3ZC1lYTZkMzI0NGQyODEiLCJwdWlkIjoiMTAwMzIwMDBEQkYxQkMyOSIsInJoIjoiMC5BQUFBY0NDbl9fcGppVW1Yd0MyU0RQdTRYTURtUEY0Zks0VkNqVXQxN25oNGMwWmJBQVkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoieVR6cTNPdzFTVWFIZUt3RDZveUc5a2RyNlBWM2swUVlrOG1JOFZWMGo2YyIsInRpZCI6ImZmYTcyMDcwLTYzZmEtNDk4OS05N2MwLTJkOTIwY2ZiYjg1YyIsInVuaXF1ZV9uYW1lIjoiamVmZi5qb25lc0BkZWZpbml0aXZlbG9naWMuY29tIiwidXRpIjoiaTZrVW5ON21HRUNSd2VEcDVlbFBBQSIsInZlciI6IjEuMCJ9.idN4nCIfkMGFQ7KbicpMtZQ1qqO8WUDOaYFtuvnpU0GJGTdDAW5e7cV5zU9ibHH9hQvPes95YBwAsZ_9IAlKsM0WNKClon5Zim6Yfxgm3DIJ77SIMcTcEiKolw2iWWX7ibbjgIigRYHh9RHBwoubDulHXwXMgREqg5jJJl9Cckx3Ya2RvMXp28dsAU_6KNhxkXqkZF2LiPWxJyO_LDqqQg9uCSXamHjBtIlrjYk7XEqqd9RUdq39qaHB3iM3p9oIu0eRhoRaj3sUu94Jxe4v0mhbN87jH3oWr6CljEdlSqhYyjAPArkNXLadt7MiS14kAlWgP0BItOBBh3LOBidIfA"
  "accept"="json"
  "x-ms-correlation-id"="8dc3d983-ff10-43b1-9667-e806ba8f70a5"
  "user-agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  "x-ms-client-version"="1415/1.0.0.2020082820"
  "x-ms-user-type"="null"
  "origin"="https://teams.microsoft.com"
  "sec-fetch-site"="same-site"
  "sec-fetch-mode"="cors"
  "sec-fetch-dest"="empty"
  "referer"="https://teams.microsoft.com/_"
  "accept-encoding"="gzip, deflate, br"
  "accept-language"="en-US,en;q=0.9"
} `
-ContentType "application/json" `
-Body "{`"availability`":`"Available`"}"


  Invoke-WebRequest -Uri "https://presence.teams.microsoft.com/v1/me/forceavailability/" `
-Method "PUT" `
-Headers @{
"method"="PUT"
  "authority"="presence.teams.microsoft.com"
  "scheme"="https"
  "path"="/v1/me/forceavailability/"
  "x-ms-session-id"="bd9d799e-8aea-7d25-5d13-e2296343dd06"
  "x-ms-endpoint-id"="8a9f1745-c533-48c5-a3da-1909eccebe94"
  "behavioroverride"="redirectAs404"
  "x-ms-scenario-id"="511"
  "x-ms-client-env"="pckgsvc-prod-c1-usnc-02"
  "x-ms-client-type"="web"
  "authorization"="Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlJCbTdEbm1MaF9HQXpZTzh3bGNReHBuNFZoc3VLbThTMjhUN0dPcDJrblUiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiJodHRwczovL3ByZXNlbmNlLnRlYW1zLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzBlNDUzZDYtOWQ5YS00NjYzLWEzNzUtMjY0Y2Y1NjRiMWI0LyIsImlhdCI6MTYwMDQzNzkzMSwibmJmIjoxNjAwNDM3OTMxLCJleHAiOjE2MDA0NDU0MzEsImFjciI6IjEiLCJhaW8iOiJFMkJnWUppeDR6bEhsN1dYYzRkSVJ5RzdsTk1reWZVYzYxbFA3QmU2YWM2U3NrUnl1amNBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjVlM2NlNmMwLTJiMWYtNDI4NS04ZDRiLTc1ZWU3ODc4NzM0NiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSm9uZXMiLCJnaXZlbl9uYW1lIjoiSmVmZiIsImlwYWRkciI6IjczLjUwLjYxLjE2NiIsIm5hbWUiOiJKZWZmIEpvbmVzIiwib2lkIjoiODUzMTE3MmYtMDExMi00MDI3LTgzMmMtMGE5NDAyZmQ2Njg1Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMxMDA4MTgxOS0xODQ5NjMxNjc4LTEzMDcyMTIyMzktNTE4MyIsInB1aWQiOiIxMDAzN0ZGRTgwRDQ3QUVBIiwicmgiOiIwLkFSY0ExbFBrTUpxZFkwYWpkU1pNOVdTeHRNRG1QRjRmSzRWQ2pVdDE3bmg0YzBZWEFCQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJDeUZzUE1CZm4wZmpBZlhRd2U1ajFuQXZfZC1takZpVnBEXzJzS3BSUGRNIiwidGlkIjoiMzBlNDUzZDYtOWQ5YS00NjYzLWEzNzUtMjY0Y2Y1NjRiMWI0IiwidW5pcXVlX25hbWUiOiJqam9uZXNAZWtpLWNvbnN1bHRpbmcuY29tIiwidXBuIjoiampvbmVzQGVraS1jb25zdWx0aW5nLmNvbSIsInV0aSI6IkFuMEIxQXBqM0VhX21JOVZUdVkzQUEiLCJ2ZXIiOiIxLjAifQ.VVBs067rXmCHa8FsSyO7-FBoYkvLxg1ErEkQ2e8wGYlu9qiBWx-0BBVKyXPYh6BAuS0G4Ac5NNc93Vw2cdKkCQMR1XKaROGr924CKd09nyIpXN23y8XfLt0SMvfs15_Mse1xirEGIbsgND7K3pkbT8vTQbjjV4q4djVjOQyVLW_c_zcQs69mP32JKFh8tOKPD5MO6BtQ9oLimRfrsOA7U3hZLOVMQMcOLIBUsxq8A6O-mvfcPHy6-DG5tyvqpvPH1MGI0sy3Gc2lF1s02g0mo6t3WKcgmil16rr6KJWHuZJpMxjJR9I2zdMzpfjLoSrxHdBge2IYhV_0ndxiziCung"
  "accept"="json"
  "x-ms-correlation-id"="ce2fae6a-6378-4245-8821-f01aff758e8f"
  "user-agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  "x-ms-client-version"="1415/1.0.0.2020082820"
  "x-ms-user-type"="null"
  "origin"="https://teams.microsoft.com"
  "sec-fetch-site"="same-site"
  "sec-fetch-mode"="cors"
  "sec-fetch-dest"="empty"
  "referer"="https://teams.microsoft.com/_"
  "accept-encoding"="gzip, deflate, br"
  "accept-language"="en-US,en;q=0.9"
} `
-ContentType "application/json" `
-Body "{`"availability`":`"Available`"}"


}