@echo off
set ftpPassword=%~1

call npm install
call npm run build
robocopy .\web .\deploy\wwwroot /MIR

powershell ^
	-File DeployWeb.ps1 ^
	-ftpPassword "%ftpPassword%"
