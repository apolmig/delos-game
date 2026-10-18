@echo off
if exist "%~dp0PLAY.html" (
  start "" "%~dp0PLAY.html"
) else (
  start "" "%~dp0dist\PLAY.html"
)
