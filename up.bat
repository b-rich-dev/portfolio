git pull
git add .
git commit -m "%*"
git push

call ng build
git ftp push --syncroot dist/portfolio/browser