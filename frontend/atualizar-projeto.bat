@echo off
title Atualizando FRONT + BACK no GitHub
color 0A

echo =====================================
echo     ATUALIZANDO FRONTEND
echo =====================================

cd /d C:\DAVI\Bet\frontend   :: <-- coloque o caminho correto do seu frontend

echo.
git add .
set /p MSG=Mensagem do commit (frontend): 
if "%MSG%"=="" set MSG=Atualizacao frontend
git commit -m "%MSG%"
git pull
git push

echo.
echo =====================================
echo     ATUALIZANDO BACKEND
echo =====================================

cd /d C:\DAVI\Bet\backend   :: <-- coloque o caminho correto do seu backend

echo.
git add .
set /p MSGB=Mensagem do commit (backend): 
if "%MSGB%"=="" set MSGB=Atualizacao backend
git commit -m "%MSGB%"
git pull
git push

echo.
echo =====================================
echo   ✔ FRONT + BACK ATUALIZADOS!
echo =====================================
pause
