# Push all missing files (src, public, assets, components) to GitHub
$git = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $git)) {
    $found = Get-Command git -ErrorAction SilentlyContinue
    if ($found) { $git = $found.Source }
}

if (-not (Test-Path $git)) {
    Write-Error "Git executable not found at C:\Program Files\Git\cmd\git.exe"
    exit 1
}

Write-Host "Using Git: $git"

$repoUrl = "https://github.com/sukhman123456/get2gather.git"

if (-not (Test-Path ".git")) {
    Write-Host "Initializing local git repository..."
    & $git init -b main
}

# Ensure remote is set
$currentRemote = & $git remote get-url origin 2>$null
if (-not $currentRemote) {
    & $git remote add origin $repoUrl
} else {
    & $git remote set-url origin $repoUrl
}

Write-Host "Fetching from remote..."
& $git fetch origin main

Write-Host "Aligning tree with remote..."
& $git reset --mixed origin/main

Write-Host "Staging all project files (src, public, components, styles, assets)..."
& $git add -A

Write-Host "Checking status..."
& $git status --short

# Ensure git user info is set for this repo if not set globally
$userName = & $git config user.name
if (-not $userName) {
    & $git config user.name "sukhman123456"
}
$userEmail = & $git config user.email
if (-not $userEmail) {
    & $git config user.email "sukhman123456@users.noreply.github.com"
}

# Commit if there are changes
$status = & $git status --porcelain
if ($status) {
    Write-Host "Committing missing files..."
    & $git commit -m "feat: upload full src code, 3D components, and public restaurant assets"
    Write-Host "Pushing to GitHub (main branch)..."
    & $git push origin main
} else {
    Write-Host "All files are already up to date on GitHub!"
}



