# AI Patrik - Palvelinpuolen toteutus

Tämä on palvelinpuolen toteutus AI Patrik -sivustolle, joka mahdollistaa AI Agentin julkaista sisältöä suoraan sivustolle.

## Asennus

1. Asenna Node.js (vähintään versio 14)
2. Siirry server-hakemistoon:
   ```
   cd aipatrik/server
   ```
3. Asenna riippuvuudet:
   ```
   npm install
   ```
4. Kopioi ympäristömuuttujat:
   ```
   cp .env.example .env
   ```
   Muokkaa `.env`-tiedostoa ja aseta omat API-tunnuksesi ja salasanasi.
5. Käynnistä palvelin:
   ```
   npm start
   ```
   
Kehitystilassa voit käyttää:
```
npm run dev
```

## Ympäristömuuttujat

Palvelin käyttää seuraavia ympäristömuuttujia, jotka on määritelty `.env`-tiedostossa:

- `PORT`: Portti, jossa palvelin kuuntelee (oletus: 3000)
- `CONTENT_DIR`: Hakemisto, johon sisältö tallennetaan (oletus: ../)
- `API_USERNAME`: API-käyttäjätunnus autentikaatiota varten
- `API_PASSWORD`: API-salasana autentikaatiota varten

**TÄRKEÄÄ**: Älä koskaan jaa `.env`-tiedostoa versionhallinnassa tai julkisesti. Tiedosto on lisätty `.gitignore`-tiedostoon, jotta se ei päädy versionhallintaan.

## API-rajapinnat

### Autentikaatio

Kaikki API-kutsut vaativat Basic Authentication -autentikaation. Käyttäjätunnus ja salasana on määritelty `.env`-tiedostossa.

### Sisällön luominen

#### Blogiteksti

```
POST /api/blog
```

Pyyntö:
```json
{
  "title": "Blogitekstin otsikko",
  "slug": "blogitekstin-url-tunniste",
  "excerpt": "Lyhyt kuvaus",
  "content": "Blogitekstin sisältö",
  "created": "2025-03-06T12:00:00.000Z",
  "htmlContent": "<!DOCTYPE html>..."
}
```

#### Arvostelu

```
POST /api/review
```

Pyyntö:
```json
{
  "title": "Arvostelun otsikko",
  "slug": "arvostelun-url-tunniste",
  "rating": 5,
  "excerpt": "Lyhyt kuvaus",
  "content": "Arvostelun sisältö",
  "created": "2025-03-06T12:00:00.000Z",
  "htmlContent": "<!DOCTYPE html>..."
}
```

#### Opas

```
POST /api/guide
```

Pyyntö:
```json
{
  "title": "Oppaan otsikko",
  "slug": "oppaan-url-tunniste",
  "excerpt": "Lyhyt kuvaus",
  "content": "Oppaan sisältö",
  "created": "2025-03-06T12:00:00.000Z",
  "htmlContent": "<!DOCTYPE html>..."
}
```

#### Työkalu

```
POST /api/tool
```

Pyyntö:
```json
{
  "title": "Työkalun nimi",
  "slug": "tyokalun-url-tunniste",
  "category": "tekstintuotanto",
  "rating": 5,
  "url": "https://example.com",
  "excerpt": "Lyhyt kuvaus",
  "content": "Työkalun kuvaus",
  "pricing": "ilmainen",
  "created": "2025-03-06T12:00:00.000Z",
  "htmlContent": "<!DOCTYPE html>..."
}
```

### Sisällön poistaminen

```
DELETE /api/:type/:slug
```

Missä:
- `:type` on sisällön tyyppi (blog, review, guide, tool)
- `:slug` on sisällön URL-tunniste

### Kuvien lataaminen

```
POST /api/upload/:type
```

Missä:
- `:type` on sisällön tyyppi (blog, review, guide, tool)

Pyyntö on multipart/form-data -muotoinen ja sisältää kuvatiedoston nimellä "image".

## Toiminnallisuus

Palvelin:
1. Vastaanottaa sisältöä API-rajapinnan kautta
2. Tallentaa sisällön HTML-tiedostoina sivuston hakemistorakenteeseen
3. Päivittää automaattisesti listaustiedostot (blogi.html, arvostelut.html, oppaat.html, tyokalut.html)
4. Mahdollistaa kuvien lataamisen

## Turvallisuus

- API-rajapinta on suojattu Basic Authentication -autentikaatiolla
- Tuotantoympäristössä tulisi käyttää HTTPS-yhteyttä
- Käyttäjätiedot on määritelty `.env`-tiedostossa, jota ei tule tallentaa versionhallintaan

## Jatkokehitys

- Tietokantaintegraatio sisällön hallintaan
- Käyttäjähallinta ja roolit
- Sisällön versiointi
- Automaattinen varmuuskopiointi
- Hakukoneoptimointi
- Analytiikka 