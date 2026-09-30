@echo off
setlocal
set "DEST=%LOCALAPPDATA%\SagaDiorama"
echo Installing Saga Diorama screensaver to "%DEST%" ...
xcopy /E /I /Y "%~dp0app" "%DEST%" >nul || (echo Copy failed. & pause & exit /b 1)
reg add "HKCU\Control Panel\Desktop" /v SCRNSAVE.EXE /t REG_SZ /d "%DEST%\SagaDiorama.scr" /f >nul
reg add "HKCU\Control Panel\Desktop" /v ScreenSaveActive /t REG_SZ /d 1 /f >nul
rundll32.exe user32.dll,UpdatePerUserSystemParameters
echo.
echo Installed and selected as your screensaver.
echo Set the idle time in Settings ^> Personalization ^> Lock screen ^> Screen saver settings.
echo Preview now:  "%DEST%\SagaDiorama.scr" /s
pause
