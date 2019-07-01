param (
	[string]$sqlPassword = $( Read-Host "Sql password" ),
	[string]$ftpPassword = $( Read-Host "Ftp password" ),
	[string]$jwtSecret = $( Read-Host "Jwt secret" )
)

$ErrorActionPreference = "Stop"

try {
	Write-Host "Replacing cache busting version in index.html..."
	$contents = Get-Content .\deploy\wwwroot\index.html
	$newContents = $contents | ForEach-Object { $_ -replace '\?v=\d+', ('?v={0:yyyyMMddHHmmss}' -f (Get-Date)) }
	$newContents | Set-Content .\deploy\wwwroot\index.html

	Write-Host "Replacing connection string and jwt secret in Web.config..."
	$properties = `
		"Server=tcp:diet.database.windows.net,1433", `
		"Initial Catalog=Diet", `
		"Persist Security Info=False", `
		"User ID=DietApi", `
		"Password=$sqlPassword", `
		"MultipleActiveResultSets=False", `
		"Encrypt=True", `
		"TrustServerCertificate=False", `
		"Connection Timeout=30"
	$connectionString = [System.String]::Join(";", $properties)
	$newConnectionString = "connectionString=""$connectionString"""
	$newSecret = "key=""Secret"" value=""$jwtSecret"""
	$contents = Get-Content .\deploy\api\Web.config
	$newContents = $contents | ForEach-Object { $_ -replace 'connectionString=".+"', $newConnectionString }
	$newContents = $newContents | ForEach-Object { $_ -replace 'key="Secret" value=".+"', $newSecret }
	$newContents | Set-Content .\deploy\api\Web.config

	Add-Type -Path "C:\Program Files (x86)\WinSCP\WinSCPnet.dll"
	$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
		Protocol = [WinSCP.Protocol]::Ftp
		HostName = "waws-prod-sn1-059.ftp.azurewebsites.windows.net"
		UserName = "LightWeight__cold\DietScores"
		Password = $ftpPassword
	}
	$session = New-Object WinSCP.Session
	try {
		Write-Host "Connecting to azure ftp server..."
		$session.Open($sessionOptions)

		Write-Host "Purging current ftp files..."
		$result = $session.RemoveFiles("/site/*")
		$result.Check()

		Write-Host "Uploading contents of \deploy..."
		$transferOptions = New-Object WinSCP.TransferOptions
		$transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
		$localDirectory = Join-Path (Get-Location) "deploy\*"
		$result = $session.PutFiles($localDirectory, "/site/", $false, $transferOptions)
		$result.Check()
	} finally {
		$session.Dispose()
	}
	exit 0
} catch [Exception] {
	Write-Host $_.Exception.Message
	exit 1
}
