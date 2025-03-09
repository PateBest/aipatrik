@echo off
echo Valmistellaan tiedostot GitHub-vientiä varten...

echo.
echo Tarkistetaan, että .gitignore on ajan tasalla...
type .gitignore

echo.
echo Varmistetaan, että arkaluontoiset tiedostot eivät päädy GitHubiin...
echo Tarkista, että seuraavat tiedostot EIVÄT näy git status -komennon tuloksissa:
echo - .env
echo - config.local.js
echo - config.runtime.js
echo - server/.env

echo.
echo Suorita seuraavat komennot viedäksesi tiedostot GitHubiin:
echo.
echo git add .
echo git status
echo git commit -m "Initial commit"
echo git push origin main
echo.
echo HUOM: Tarkista git status -komennon tulos huolellisesti ennen commit-komentoa!
echo. 