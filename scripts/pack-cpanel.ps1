$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$apiBaseUrl = if ($env:NEXT_PUBLIC_API_BASE_URL) { $env:NEXT_PUBLIC_API_BASE_URL } else { "https://admin.tuongphugroup.com/api" }
$siteUrl = if ($env:NEXT_PUBLIC_SITE_URL) { $env:NEXT_PUBLIC_SITE_URL } else { "https://tuongphugroup.com" }
$adminUser = if ($env:ADMIN_USERNAME) { $env:ADMIN_USERNAME } else { "admin" }
$adminPass = if ($env:ADMIN_PASSWORD) { $env:ADMIN_PASSWORD } else { "change_this_password" }

Write-Host "Fetching production admin token..."
$loginBody = @{ username = $adminUser; password = $adminPass } | ConvertTo-Json
$loginResponse = Invoke-RestMethod -Method POST -Uri "$apiBaseUrl/auth/login" -ContentType "application/json" -Body $loginBody
$adminToken = $loginResponse.token

if (-not $adminToken) {
  throw "Could not obtain admin token from $apiBaseUrl/auth/login"
}

$env:NEXT_PUBLIC_API_BASE_URL = $apiBaseUrl
$env:NEXT_PUBLIC_SITE_URL = $siteUrl
$env:NEXT_PUBLIC_STATIC_RUNTIME = "true"
$env:API_ADMIN_TOKEN = $adminToken

Write-Host "Building static export..."
Write-Host "  API: $apiBaseUrl"
Write-Host "  Site: $siteUrl"
npm run build:static

if (-not (Test-Path "out/index.html")) {
  throw "Build finished but out/index.html was not created."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
$zipName = "tuongphu-cpanel-$timestamp.zip"
$zipPath = Join-Path $projectRoot $zipName

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

Write-Host "Creating $zipName ..."
tar.exe -a -cf $zipPath -C out .

$sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)

Write-Host ""
Write-Host "Done."
Write-Host "Upload the contents of the zip to public_html on cPanel."
Write-Host "Package: $zipPath ($sizeMb MB)"
