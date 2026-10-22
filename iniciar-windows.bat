@echo off
cd /d "%~dp0"
echo Abrindo a TechGlam em http://localhost:5500
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 5500
) else (
    python -m http.server 5500
)
pause
