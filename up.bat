git pull
git add .
git commit -m "%*"
git push

ng build
git ftp push --syncroot dist/portfolio/browser --dirty
pause