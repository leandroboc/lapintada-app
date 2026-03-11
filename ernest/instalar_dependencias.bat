@echo off
setlocal
echo ==========================================
echo    INSTALANDO DEPENDENCIAS (NPM)
echo ==========================================

:: Agregar Node.js portatil al PATH
set "PROJECT_ROOT=%~dp0"
set "NODE_PATH=%PROJECT_ROOT%node_bin\node-v20.11.0-win-x64"
set "PATH=%NODE_PATH%;%PATH%"

echo Node.js path: %NODE_PATH%
echo.

echo Ejecutando npm install...
npm install

echo.
echo ==========================================
echo  LISTO! Ahora ejecuta iniciar_sistema.bat
echo ==========================================
pause