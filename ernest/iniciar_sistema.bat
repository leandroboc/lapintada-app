@echo off
setlocal
echo ==========================================
echo      INICIANDO VETSYSTEM (VITE)
echo ==========================================

:: Agregar Node.js portatil al PATH
set "PROJECT_ROOT=%~dp0"
set "NODE_PATH=%PROJECT_ROOT%node_bin\node-v20.11.0-win-x64"
set "PATH=%NODE_PATH%;%PATH%"

:: Verificar que node funciona
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] No se pudo encontrar Node.js en: %NODE_PATH%
    echo Por favor verifica que la carpeta node_bin exista.
    pause
    exit /b 1
)

echo Node.js detectado correctamente.
echo.
echo Iniciando servidor de desarrollo...
echo.
echo ------------------------------------------
echo  Web: http://localhost:5173
echo ------------------------------------------
echo.

npm run dev

pause