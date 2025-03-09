# AI Patrik - Tekoälypalveluiden Asiantuntija

AI Patrik on verkkosivusto, joka tarjoaa tietoa, oppaita ja työkaluja tekoälyn hyödyntämiseen. Sivusto on suunniteltu auttamaan käyttäjiä ymmärtämään ja hyödyntämään tekoälyteknologioita tehokkaasti.

## Sivuston Rakenne

Sivusto koostuu seuraavista osioista:

- **Etusivu**: Yleiskatsaus AI Patrikin palveluihin ja viikon suositeltu työkalu
- **Työkalut**: Kattava kokoelma tekoälytyökaluja eri käyttötarkoituksiin
- **Oppaat**: Yksityiskohtaisia ohjeita tekoälyn hyödyntämiseen
- **Blogi**: Ajankohtaisia artikkeleita tekoälyyn liittyen
- **Arvostelut**: Käyttäjien kokemuksia ja arvioita eri tekoälytyökaluista
- **Yhteystiedot**: Yhteydenottolomake ja yhteystiedot

## Tekninen Toteutus

Sivusto on rakennettu käyttäen seuraavia teknologioita:

- HTML5
- CSS3 (mukautetut tyylit)
- JavaScript (vanilla JS)
- Font Awesome -ikonit
- Responsiivinen suunnittelu kaikille laitteille
- SupaBase integraatio uutiskirjeen tilaajien hallintaan

## Ominaisuudet

- **Moderni käyttöliittymä**: Tyylikäs ja käyttäjäystävällinen design
- **Responsiivisuus**: Toimii saumattomasti kaikilla laitteilla
- **Uutiskirjeen tilaus**: SupaBase-integraatio tilaajien hallintaan
- **Sosiaalisen median integraatio**: Linkit sosiaalisen median kanaviin
- **Kielivalinta**: Tuki useille kielille (tulossa pian)

## Asennus ja Käyttöönotto

### Paikallinen Kehitys

1. Kloonaa repositorio:
   ```
   git clone https://github.com/yourusername/ai-patrik.git
   cd ai-patrik
   ```

2. Aseta ympäristömuuttujat:
   - Kopioi `.env.example` tiedosto nimellä `.env` sekä juurihakemistoon että server-hakemistoon
   - Täytä `.env` tiedostoihin omat API-avaimesi ja muut tarvittavat tiedot
   ```
   cp .env.example .env
   cp server/.env.example server/.env
   ```

3. Avaa `index.html` selaimessa tai käytä paikallista palvelinta:
   ```
   # Python 3
   python -m http.server
   
   # Python 2
   python -m SimpleHTTPServer
   ```

4. Sivusto on nyt käytettävissä osoitteessa `http://localhost:8000`

### SupaBase Integraatio

Uutiskirjeen tilaajien hallintaan käytetään SupaBase-palvelua. Asetukset ja ohjeet löytyvät kansiosta `supabase/README.md`.

## Sivuston Julkaisu

Sivusto voidaan julkaista millä tahansa staattisten sivustojen hosting-palvelulla:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

Katso tarkemmat ohjeet julkaisuun kunkin palvelun dokumentaatiosta.

## Hakemistorakenne

```
ai-patrik/
├── index.html              # Etusivu
├── css/
│   └── styles.css          # Päätyylit
├── js/
│   └── main.js             # JavaScript-toiminnallisuudet
├── images/                 # Kuvat ja ikonit
├── pages/                  # Alasivut
│   ├── tyokalut.html       # Työkalut-sivu
│   ├── oppaat.html         # Oppaat-sivu
│   ├── blogi.html          # Blogi-sivu
│   ├── arvostelut.html     # Arvostelut-sivu
│   └── yhteystiedot.html   # Yhteystiedot-sivu
└── supabase/               # SupaBase integraatio
    ├── README.md           # SupaBase ohjeet
    └── functions/          # SupaBase Edge Functions
```

## Kehitys ja Ylläpito

Sivuston kehitys ja ylläpito tapahtuu seuraavasti:

1. Tee muutokset paikallisesti
2. Testaa muutokset eri selaimilla ja laitteilla
3. Päivitä versiohistoria ja dokumentaatio
4. Julkaise muutokset

## Yhteystiedot

Jos sinulla on kysyttävää tai ehdotuksia sivustoon liittyen, ota yhteyttä:

- Sähköposti: aipatrik@outlook.com
- Verkkosivusto: [www.aipatrik.com](https://www.aipatrik.com)

## Lisenssi

Tämä projekti on lisensoitu [MIT-lisenssin](LICENSE) alaisuudessa. 