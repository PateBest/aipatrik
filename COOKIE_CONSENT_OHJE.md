# Evästeiden suostumuspalkin lisääminen kaikille sivuille

Tämä ohje kertoo, miten evästeiden suostumuspalkki lisätään kaikille sivuille.

## Tiedostot

Evästeiden suostumuspalkki koostuu seuraavista tiedostoista:

1. `css/cookie-consent.css` - Evästeiden suostumuspalkin tyylit
2. `js/cookie-consent.js` - Evästeiden suostumuspalkin toiminnallisuus
3. `js/cookie-consent-loader.js` - Apuskripti, joka lataa evästeiden suostumuspalkin

## Lisääminen sivuille

### Pääsivulle (index.html)

Lisää seuraava rivi ennen `</body>`-tagia:

```html
<script src="js/cookie-consent.js"></script>
```

### Alasivuille (pages/*.html)

Lisää seuraava rivi ennen `</body>`-tagia:

```html
<script src="../js/cookie-consent-loader.js"></script>
```

## Testaaminen

Voit testata evästeiden suostumuspalkkia seuraavasti:

1. Tyhjennä selaimesi evästeet ja paikallinen tallennustila
2. Avaa sivu uudelleen
3. Evästeiden suostumuspalkin pitäisi näkyä sivun alareunassa

## Huomioitavaa

- Evästeiden suostumuspalkki näytetään vain kerran käyttäjälle. Kun käyttäjä hyväksyy evästeet, suostumus tallennetaan selaimen paikalliseen tallennustilaan.
- Google Analytics -skripti ladataan vasta, kun käyttäjä on hyväksynyt evästeet.
- Evästeiden suostumuspalkki on responsiivinen ja toimii kaikilla näyttökoilla.
- "Lisätietoja"-painike ohjaa käyttäjän tietosuojakäytäntö-sivulle.

## Muokkaaminen

Jos haluat muokata evästeiden suostumuspalkkia, voit tehdä sen seuraavasti:

### Ulkoasun muokkaaminen

Muokkaa tiedostoa `css/cookie-consent.css`.

### Toiminnallisuuden muokkaaminen

Muokkaa tiedostoa `js/cookie-consent.js`.

### Tekstien muokkaaminen

Muokkaa tiedostoa `js/cookie-consent.js` ja etsi seuraava kohta:

```javascript
banner.innerHTML = `
    <div class="cookie-content">
        <div class="cookie-text">
            <h3><i class="fas fa-cookie-bite"></i> Evästeiden käyttö</h3>
            <p>Käytämme evästeitä parantaaksemme sivuston käyttökokemusta ja analysoidaksemme liikennettä. 
            Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.</p>
        </div>
        <div class="cookie-buttons">
            <button class="cookie-accept">Hyväksyn</button>
            <button class="btn-secondary cookie-more-info">Lisätietoja</button>
        </div>
    </div>
`;
```

Muokkaa tekstejä tarpeen mukaan. 