param (
	[string]$ftpPassword = $( Read-Host "Ftp password" )
)

Write-Host "Replacing cache busting version in index.html..."
$contents = Get-Content .\deploy\wwwroot\index.html
$newContents = $contents | ForEach-Object { $_ -replace '\?v=\d+', ('?v={0:yyyyMMddHHmmss}' -f (Get-Date)) }
$newContents | Set-Content .\deploy\wwwroot\index.html

try {
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

		Write-Host "Purging current ftp web files..."
		$result = $session.RemoveFiles("/site/wwwroot/*")
		$result.Check()

		Write-Host "Uploading contents of \deploy\wwwroot\..."
		$transferOptions = New-Object WinSCP.TransferOptions
		$transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
		$localDirectory = Join-Path (Get-Location) "deploy\wwwroot\*"
		$result = $session.PutFiles($localDirectory, "/site/wwwroot/", $false, $transferOptions)
		$result.Check()
	} finally {
		$session.Dispose()
	}
	exit 0
} catch [Exception] {
	Write-Host $_.Exception.Message
	exit 1
}
