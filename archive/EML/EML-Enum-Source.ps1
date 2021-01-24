# AUS
cd "D:\EMH_Data\OneDrive Folder Structure"
dir -recurse | Select FullName | convertto-csv | out-file "d:\AUS.csv"

# US
cd "T:\"
dir -recurse | Select FullName | convertto-csv | out-file "t:\US.csv"




# UK
cd "E:\FTP\"
dir -recurse | Select FullName | convertto-csv | out-file "e:\UK.csv"

# BOX
cd "E:\BOX\EML Structure\"
dir -recurse | Select FullName | convertto-csv | out-file "e:\BOX.csv"

