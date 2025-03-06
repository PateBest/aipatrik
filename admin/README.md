# AI Patrik - AI Agentti Hallintapaneeli

Tämä hallintapaneeli mahdollistaa AI Agentin julkaista blogitekstejä, arvosteluja, oppaita ja työkaluja suoraan AI Patrik -sivustolle.

## Käyttöönotto

### Client-side (selainpohjainen) toteutus

1. Avaa `login.html` selaimessa
2. Kirjaudu sisään seuraavilla tunnuksilla:
   - Käyttäjätunnus: `ai_agentti`
   - Salasana: `aipatrik2025`
3. Kirjautumisen jälkeen pääset hallintapaneeliin

### Server-side (palvelinpohjainen) toteutus

1. Asenna Node.js (vähintään versio 14)
2. Siirry server-hakemistoon:
   ```
   cd ../server
   ```
3. Asenna riippuvuudet:
   ```
   npm install
   ```
4. Käynnistä palvelin:
   ```
   npm start
   ```
5. Palvelin käynnistyy osoitteeseen http://localhost:3000

## Ominaisuudet

### Blogitekstien hallinta
- Uusien blogitekstien luominen
- Olemassa olevien blogitekstien muokkaaminen
- Blogitekstien poistaminen
- Blogitekstien esikatselu

### Arvostelujen hallinta
- Uusien arvostelujen luominen
- Olemassa olevien arvostelujen muokkaaminen
- Arvostelujen poistaminen
- Arvostelujen esikatselu

### Oppaiden hallinta
- Uusien oppaiden luominen
- Olemassa olevien oppaiden muokkaaminen
- Oppaiden poistaminen
- Oppaiden esikatselu

### Työkalujen hallinta
- Uusien työkalujen lisääminen
- Olemassa olevien työkalujen muokkaaminen
- Työkalujen poistaminen
- Työkalujen esikatselu
- Työkalujen kategorisointi ja arviointi

## Tekninen toteutus

### Client-side (selainpohjainen)

Hallintapaneeli on toteutettu käyttäen seuraavia teknologioita:
- HTML5
- CSS3
- JavaScript (vanilla JS)
- LocalStorage tietojen tallentamiseen

Tiedostorakenne:
- `login.html` - Kirjautumissivu
- `dashboard.html` - Hallintapaneeli
- `js/auth.js` - Autentikaatio
- `js/dashboard.js` - Hallintapaneelin toiminnallisuus
- `js/api.js` - Client-side API-toiminnallisuus sisällön hallintaan
- `js/api-client.js` - Server-side API-client sisällön hallintaan

### Server-side (palvelinpohjainen)

Palvelinpuolen toteutus on tehty käyttäen seuraavia teknologioita:
- Node.js
- Express.js
- Multer (tiedostojen lataaminen)
- Dotenv (ympäristömuuttujat)

Tiedostorakenne:
- `server.js` - Palvelimen pääohjelma
- `package.json` - Projektin riippuvuudet
- `.env` - Ympäristömuuttujat

## Toimintaperiaate

1. **Client-side fallback**: Jos palvelinyhteys ei ole käytettävissä, sisältö tallennetaan selaimen LocalStorage-muistiin
2. **Server-side toteutus**: Kun palvelinyhteys on käytettävissä, sisältö tallennetaan palvelimelle HTML-tiedostoina
3. **Automaattinen päivitys**: Palvelin päivittää automaattisesti listaustiedostot (blogi.html, arvostelut.html, oppaat.html, tyokalut.html)

## Huomioitavaa

- Client-side toteutus simuloi palvelinpuolen toiminnallisuutta
- Server-side toteutus tallentaa sisältön HTML-tiedostoina sivuston hakemistorakenteeseen
- Tiedot tallennetaan selaimen LocalStorage-muistiin, joten ne säilyvät vain samassa selaimessa, jos palvelinyhteys ei ole käytettävissä

## Turvallisuus

- Käyttäjätiedot on kovakoodattu `auth.js`-tiedostoon ja `.env`-tiedostoon
- Tuotantoympäristössä tulisi käyttää turvallisempaa autentikaatiomenetelmää, kuten OAuth tai JWT
- Sisäänkirjautumistiedot tallennetaan sessionStorage-muistiin, joka tyhjenee selaimen sulkeutuessa
- API-rajapinta on suojattu Basic Authentication -autentikaatiolla
- Tuotantoympäristössä tulisi käyttää HTTPS-yhteyttä

## Jatkokehitys

- Tietokantaintegraatio sisällön hallintaan
- Käyttäjähallinta ja roolit
- Sisällön versiointi
- Automaattinen varmuuskopiointi
- Kuvien lataaminen ja hallinta
- Julkaisuajastus
- Hakukoneoptimointi
- Analytiikka 