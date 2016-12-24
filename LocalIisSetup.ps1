Import-Module WebAdministration
Add-Type -Path C:\Windows\System32\inetsrv\Microsoft.Web.Administration.dll

$name = "Diet"
$pool = "IIS:\AppPools\$name"
$site = "IIS:\Sites\$name"
$api = "IIS:\Sites\$name\api"
$hostName = "localdiet.directs.com"
$path = Get-Location
$webPath = Join-Path $path "web"
$apiPath = Join-Path $path "api"

if (Test-Path -Path $pool) {
	Write-Host "Application pool $name already exists."
} else {
	Write-Host "Creating application pool $name..."
	New-WebAppPool -Name $name
}
Write-Host "Setting application pool properties..."
Set-ItemProperty -Path $pool -Name ManagedRuntimeVersion -Value v4.0
Set-ItemProperty -Path $pool -Name ManagedPipelineMode -Value ([int] [Microsoft.Web.Administration.ManagedPipelineMode]::Integrated)
Set-ItemProperty -Path $pool -Name ProcessModel.IdentityType -Value ([int] [Microsoft.Web.Administration.ProcessModelIdentityType]::NetworkService)

Write-Host "Creating site $name (forced)..."
New-Website -Name $name -ApplicationPool $name -PhysicalPath "$webPath" -HostHeader $hostName -Force

Write-Host "Creating api application (forced)..."
New-WebApplication -Site $name -Name "Api" -PhysicalPath "$apiPath" -ApplicationPool $name -Force

$hostFile = "c:\windows\system32\drivers\etc\hosts"
$hostEntry = Get-Content -Path "${hostFile}" | Where-Object {$_ -match "127.0.0.1\s+$hostName".replace(".", "\.")}
if ($hostEntry -eq $null) {
	Write-Host "Adding host file entry $hostName..."
	Add-Content -Path "${hostFile}" "`n127.0.0.1 $hostName`n"
} else {
	Write-Host "Host file entry already exists."
}
