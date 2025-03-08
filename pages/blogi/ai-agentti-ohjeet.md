# AI Agentin ohjeet blogiartikkelien luomiseen

Tämä ohje auttaa AI Agenttia luomaan uusia blogiartikkeleita AI Patrik -sivustolle. Ohjeet sisältävät vaiheittaiset toimenpiteet artikkelin luomiseen ja sen lisäämiseen blogi-sivulle.

## Vaihe 1: Luo uusi blogiartikkeli

1. Käytä mallipohjaa `artikkeli-malli.html` uuden artikkelin luomiseen.
2. Tallenna uusi artikkeli nimellä `aihe-artikkeli.html` (esim. `midjourney-artikkeli.html`) kansioon `aipatrik/pages/blogi/`.
3. Täytä kaikki kohdat, jotka on merkitty kommenteilla `<!-- TÄYTÄ: ... -->`.

### Tärkeimmät täytettävät kohdat:

- **Metatiedot**:
  - Artikkelin otsikko (`<title>`)
  - Meta-kuvaus (`<meta name="description">`)

- **Artikkelin sisältö**:
  - Pääotsikko (`<h1>`)
  - Julkaisupäivä ja kirjoittaja
  - Johdantokappale (lainausmerkkien sisällä)
  - Ensimmäinen kappale
  - Alaotsikot (`<h2>`) ja niiden sisältö
  - Alaotsikkojen alaotsikot (`<h3>`) ja niiden sisältö
  - Yhteenveto

- **CTA-osio**:
  - CTA-otsikko
  - CTA-kuvaus
  - CTA-linkki ja -teksti

- **Lue lisää -osio**:
  - Liittyvien artikkelien otsikot, kuvaukset ja linkit

## Vaihe 2: Lisää artikkeli blogi-sivulle

1. Käytä mallipohjaa `blogi-kortti-malli.html` uuden kortin luomiseen.
2. Lisää kortti tiedostoon `aipatrik/pages/blogi.html` `<div class="grid">` -elementin sisälle, mieluiten ensimmäiseksi kortiksi.

### Tärkeimmät täytettävät kohdat kortissa:

- **Data-attribuutit**:
  - `data-category`: Artikkelin kategoria pienillä kirjaimilla (esim. "keskustelurobotit", "kuvanluonti")
  - `data-date`: Julkaisupäivä muodossa "VUOSI-KK" (esim. "2025-03")
  - `data-author`: Kirjoittajan nimi (esim. "Patrik Juuti", "Patrik AI")

- **Kortin sisältö**:
  - Artikkelin otsikko (`<h3>`)
  - Artikkelin lyhyt kuvaus (`<p>`)
  - Kategoria-tagi (esim. "Keskustelurobotti", "Kuvanluonti")
  - Päivämäärä-tagi (esim. "15.3.2025")
  - Kirjoittaja-tagi (esim. "Patrik Juuti")
  - Linkki artikkeliin (`href="blogi/tiedostonimi.html"`)

## Tyyliohjeet

- **Otsikot**: Käytä gradient-tyyliä kaikissa otsikoissa (h1, h2, h3, h4).
- **Johdantokappale**: Käytä lainausmerkkejä ja vihreää taustaväriä.
- **Tagit**: Käytä oikeita värejä tageille (sininen kategorialle, violetti päivämäärälle, vihreä kirjoittajalle).
- **CTA-painike**: Käytä vihreää gradient-tyyliä.

## Kategoriat

Käytä seuraavia kategorioita:
- Keskustelurobotit (`keskustelurobotit`)
- Kuvanluonti (`kuvanluonti`)
- Videogenerointi (`videogenerointi`)
- Ääni ja puhe (`aani`)
- Tuottavuus (`tuottavuus`)
- Tiedonhaku (`tiedonhaku`)
- Trendit ja tulevaisuus (`trendit`)
- Käytännön vinkit (`kaytannot`)

## Kirjoitustyyli

- Kirjoita selkeää, helppolukuista tekstiä.
- Käytä konkreettisia esimerkkejä.
- Puhuttele lukijaa suoraan ("sinä").
- Jaa pitkät tekstikappaleet pienempiin osiin.
- Käytä listoja ja alaotsikoita selkeyttämään rakennetta.
- Sisällytä käytännön vinkkejä ja toimintakehotuksia.
- Pidä artikkelin pituus 1000-2000 sanan välillä.

## Esimerkki

Katso mallia olemassa olevasta artikkelista `chatgpt-artikkeli.html`. 