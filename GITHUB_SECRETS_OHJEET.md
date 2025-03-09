# GitHub Secrets -asetusten määrittäminen

Tämä ohje neuvoo, miten määrität GitHub Secrets -asetukset Supabase-avaimia varten.

## Vaiheet

1. **Mene GitHub-repositoriosi asetuksiin**:
   - Avaa GitHub-repositoriosi
   - Klikkaa "Settings" (Asetukset) -välilehteä

2. **Avaa Secrets and variables -osio**:
   - Vasemmasta sivupalkista valitse "Secrets and variables"
   - Valitse "Actions"

3. **Lisää uusi secret**:
   - Klikkaa "New repository secret" -painiketta
   - Lisää Supabase-avaimet seuraavilla nimillä:
     - Nimi: `SUPABASE_URL`, Arvo: [sinun Supabase URL]
     - Nimi: `SUPABASE_ANON_KEY`, Arvo: [sinun Supabase anon key]

4. **Suorita GitHub Actions -työnkulku**:
   - Kun olet määrittänyt salaisuudet, GitHub Actions -työnkulku käyttää niitä automaattisesti
   - Voit käynnistää työnkulun manuaalisesti menemällä "Actions"-välilehdelle ja valitsemalla "Deploy to GitHub Pages" -työnkulun

## Paikallinen kehitys

Paikallista kehitystä varten:

1. Kopioi `config.local.js.example` tiedosto nimellä `config.local.js`
2. Lisää omat Supabase-avaimesi tiedostoon
3. Älä koskaan lisää `config.local.js`-tiedostoa versionhallintaan!

## Turvallisuushuomioita

- GitHub Secrets -asetukset ovat salattu ja näkyvät vain GitHub Actions -työnkuluissa
- Älä koskaan lisää oikeita API-avaimia suoraan koodiin
- Käytä Supabase Row Level Security (RLS) -asetuksia rajoittaaksesi tietokannan käyttöoikeuksia 