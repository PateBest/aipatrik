# GitHub-vientiohjeet

Tämä ohje auttaa sinua viemään oikeat tiedostot GitHubiin.

## Vie nämä tiedostot GitHubiin:

1. **HTML, CSS ja JavaScript-tiedostot**:
   - Kaikki `.html`-tiedostot
   - Kaikki `.css`-tiedostot
   - Kaikki `.js`-tiedostot (paitsi `config.local.js` ja `config.runtime.js`)

2. **Konfiguraatiotiedostot**:
   - `config.js` (yleinen konfiguraatiologiikka)
   - `config.local.js.example` (esimerkki paikallisesta konfiguraatiosta)
   - `.gitignore` (määrittää, mitä tiedostoja ei viedä GitHubiin)
   - `.env.example` (esimerkki ympäristömuuttujista)

3. **GitHub Actions -työnkulut**:
   - `.github/workflows/deploy.yml` (määrittää, miten sivusto julkaistaan)

4. **Dokumentaatio**:
   - `README.md`
   - `GITHUB_SECRETS_OHJEET.md`
   - `GITHUB_OHJE.md`
   - Muut ohjetiedostot

5. **Kuvat ja muut resurssit**:
   - Kaikki `images/`-kansiossa olevat tiedostot
   - Muut resurssitiedostot

## ÄLÄ vie näitä tiedostoja GitHubiin:

1. **Arkaluontoiset tiedostot**:
   - `.env` (sisältää ympäristömuuttujia)
   - `config.local.js` (sisältää paikalliset API-avaimet)
   - `config.runtime.js` (luodaan GitHub Actions -työnkulussa)
   - `server/.env` (sisältää palvelinpuolen ympäristömuuttujia)

2. **Väliaikaiset tiedostot**:
   - `node_modules/` (npm-pakettien asennuskansio)
   - Käännöstiedostot (esim. `.cache/`, `dist/`, `build/`)
   - Lokitiedostot

## Vientiohjeet:

1. **Tarkista .gitignore-tiedosto**:
   Varmista, että `.gitignore`-tiedosto sisältää kaikki arkaluontoiset tiedostot.

2. **Suorita prepare-for-github.bat**:
   Tämä skripti auttaa varmistamaan, että vain oikeat tiedostot viedään GitHubiin.

3. **Tarkista Git-tila**:
   ```
   git status
   ```
   Varmista, että arkaluontoisia tiedostoja ei ole listassa.

4. **Lisää tiedostot Git-seurantaan**:
   ```
   git add .
   ```

5. **Tarkista vielä kerran**:
   ```
   git status
   ```
   Varmista, että arkaluontoisia tiedostoja ei ole listassa.

6. **Tee commit ja työnnä muutokset GitHubiin**:
   ```
   git commit -m "Initial commit"
   git push origin main
   ```

## GitHub Secrets -asetukset

Muista määrittää GitHub Secrets -asetukset repositoriossasi GITHUB_SECRETS_OHJEET.md-tiedoston ohjeiden mukaisesti. 