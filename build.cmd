@echo off
set sqlPassword=%~1
set ftpPassword=%~2
set jwtSecret=%~3

call npm install
call npm run build
robocopy .\web .\deploy\wwwroot /MIR

nuget restore DietApi.sln
"c:\program files (x86)\msbuild\14.0\bin\msbuild" ^
	DietApi.sln ^
	/p:Configuration=Release ^
	/p:Platform="Any CPU" ^
	/p:RunCodeAnalysis=false
robocopy .\api .\deploy\api ^
	Global.asax Web.config *.dll *.pdb ^
	/MIR ^
	/XD Controllers Models obj Properties Sql

powershell ^
	-File Deploy.ps1 ^
	-sqlPassword "%sqlPassword%" ^
	-ftpPassword "%ftpPassword%" ^
	-jwtSecret "%jwtSecret%"
