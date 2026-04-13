git pull
git add .
git commit -m "%*"
git push

call ng build
echo Build exit code: %ERRORLEVEL%
git ftp push --dirty --syncroot dist/portfolio/browser
echo FTP exit code: %ERRORLEVEL%
pause