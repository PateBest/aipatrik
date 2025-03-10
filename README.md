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
- Formspree integraatio yhteydenottolomaketta varten

## Ominaisuudet

- **Moderni käyttöliittymä**: Tyylikäs ja käyttäjäystävällinen design
- **Responsiivisuus**: Toimii saumattomasti kaikilla laitteilla
- **Yhteydenottolomake**: Formspree-integraatio viestien vastaanottamiseen
- **Sosiaalisen median integraatio**: Linkit sosiaalisen median kanaviin
- **Kielivalinta**: Tuki useille kielille (tulossa pian)

## Asennus ja Käyttöönotto

### Paikallinen Kehitys

1. Kloonaa repositorio:
   ```
   git clone https://github.com/yourusername/ai-patrik.git
   cd ai-patrik
   ```

2. Avaa `index.html` selaimessa tai käytä paikallista palvelinta:
   ```
   # Python 3
   python -m http.server
   
   # Python 2
   python -m SimpleHTTPServer
   ```

3. Sivusto on nyt käytettävissä osoitteessa `http://localhost:8000`

### Formspree Integraatio

Yhteydenottolomake käyttää Formspree-palvelua viestien vastaanottamiseen. Formspree on ilmainen palvelu, joka mahdollistaa lomakkeiden lähettämisen suoraan sähköpostiin ilman backend-koodia.

1. Rekisteröidy osoitteessa [formspree.io](https://formspree.io/)
2. Luo uusi lomake ja saat yksilöllisen lomakkeen URL:n
3. Päivitä lomakkeen action-attribuutti `yhteystiedot.html`-tiedostossa

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
└── pages/                  # Alasivut
    ├── tyokalut.html       # Työkalut-sivu
    ├── oppaat.html         # Oppaat-sivu
    ├── blogi.html          # Blogi-sivu
    ├── arvostelut.html     # Arvostelut-sivu
    ├── yhteystiedot.html   # Yhteystiedot-sivu
    ├── kiitos.html         # Kiitossivu lomakkeen lähetyksen jälkeen
    └── virhe.html          # Virhesivu lomakkeen lähetyksen epäonnistuessa
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