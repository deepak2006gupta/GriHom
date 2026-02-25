param(
    [switch]$SkipInstall,
    [switch]$Deploy
)

$ErrorActionPreference = 'Stop'

Write-Host 'Starting build pipeline...' -ForegroundColor Cyan

if (-not $SkipInstall) {
    Write-Host 'Installing dependencies (npm ci)...' -ForegroundColor Yellow
    npm ci
}

Write-Host 'Building production bundle (npm run build)...' -ForegroundColor Yellow
npm run build

if ($Deploy) {
    Write-Host 'Deploying build to GitHub Pages (npm run deploy)...' -ForegroundColor Yellow
    npm run deploy
}

Write-Host 'Done.' -ForegroundColor Green
