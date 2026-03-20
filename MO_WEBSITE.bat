@echo off
color 0A
cd /d "%~dp0"
cls
echo ===========================================
echo   DANG KHOI DONG WEBSITE THUONG TRA QUAN
echo ===========================================
echo.
echo (Luu y: KHONG TAT cua so nay khi dang xem web)
echo.
npm run dev -- --open
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [LOI] Khong the khoi dong website. 
    echo Vui long kiem tra xem ban da cai dat Node.js chua.
    pause
)
