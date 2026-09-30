@echo off
setlocal
set "DEST=%LOCALAPPDATA%\SagaDiorama"
reg delete "HKCU\Control Panel\Desktop" /v SCRNSAVE.EXE /f >nul 2>&1
rundll32.exe user32.dll,UpdatePerUserSystemParameters
rmdir /S /Q "%DEST%" 2>nul
echo Saga Diorama screensaver removed.
pause
