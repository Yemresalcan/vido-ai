@echo off
REM Vido AI Release Script for Windows
REM Usage: scripts\create-release.bat [version]

setlocal enabledelayedexpansion

REM Colors (Windows doesn't support colors easily, so we'll use simple output)
echo.
echo ============================================
echo    Vido AI Release Creator for Windows
echo ============================================
echo.

REM Get version from argument or prompt
if "%1"=="" (
    set /p VERSION="Enter the release version (e.g., 1.0.0): "
) else (
    set VERSION=%1
)

echo Creating release for version !VERSION!
echo.

REM Check if we're on main branch
for /f %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "!CURRENT_BRANCH!"=="main" (
    echo WARNING: You're not on main branch. Current branch: !CURRENT_BRANCH!
    set /p CONTINUE="Do you want to continue? (y/N): "
    if not "!CONTINUE!"=="y" (
        echo Release cancelled
        exit /b 0
    )
)

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if !ERRORLEVEL! neq 0 (
    echo ERROR: You have uncommitted changes. Please commit or stash them first.
    pause
    exit /b 1
)

REM Update version in package.json files
echo Updating version in package.json files...

REM Backend setup.py
if exist "app\setup.py" (
    powershell -Command "(Get-Content app\setup.py) -replace 'version=\".*\"', 'version=\"!VERSION!\"' | Set-Content app\setup.py"
    echo Updated app\setup.py
)

REM Frontend package.json
if exist "vido-site\package.json" (
    powershell -Command "(Get-Content vido-site\package.json) -replace '\"version\": \".*\"', '\"version\": \"!VERSION!\"' | Set-Content vido-site\package.json"
    echo Updated vido-site\package.json
)

REM Update API version in vido_api.py
if exist "app\vido_api.py" (
    powershell -Command "(Get-Content app\vido_api.py) -replace 'version=\".*\"', 'version=\"!VERSION!\"' | Set-Content app\vido_api.py"
    echo Updated API version in vido_api.py
)

REM Commit version updates
git add .
git commit -m "chore: bump version to !VERSION!"

REM Create and push tag
echo Creating Git tag v!VERSION!...
git tag -a "v!VERSION!" -m "Release version !VERSION!"

echo Pushing changes and tags...
git push origin main
git push origin "v!VERSION!"

echo.
echo ============================================
echo Release v!VERSION! created successfully!
echo ============================================
echo.
echo GitHub Actions will automatically:
echo   • Create a GitHub release
echo   • Build and push Docker images
echo   • Generate release notes
echo.
echo View release at: https://github.com/Yemresalcan/vido-ai/releases/tag/v!VERSION!
echo Docker images will be available at:
echo   • yemresalcan/vido-ai-backend:!VERSION!
echo   • yemresalcan/vido-ai-frontend:!VERSION!
echo.
pause 