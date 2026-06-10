@echo off
title FIFA World Cup Quiz Runner
echo ===================================================
echo   FIFA MEN'S WORLD CUP PRESENTATION QUIZ RUNNER
echo ===================================================
echo.
echo Starting local sync web server...
start "" "http://localhost:8000"
python server.py
if %ERRORLEVEL% neq 0 (
    echo.
    echo Python server failed to start or was stopped.
    echo.
    echo If Python is not installed, you can double-click 'index.html' to run it directly,
    echo or install Python from https://python.org.
    echo.
    pause
)
