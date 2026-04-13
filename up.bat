git pull
git add .
git commit -m "%*"
git push

ng build
echo Build exit code: %ERRORLEVEL%
git ftp push -D --syncroot dist/portfolio/browser
echo FTP exit code: %ERRORLEVEL%
pause