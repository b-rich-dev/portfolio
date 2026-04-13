git pull
git add .
git commit -m "%*"
git push

ng build
echo Build exit code: %ERRORLEVEL%
git ftp push --syncroot dist/portfolio/browser --dirty
echo FTP exit code: %ERRORLEVEL%
pause