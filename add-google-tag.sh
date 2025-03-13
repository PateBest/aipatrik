#!/bin/bash

# Google Analytics -tagin lisääminen kaikkiin HTML-tiedostoihin
# Tämä skripti etsii kaikki HTML-tiedostot ja lisää Google Analytics -tagin heti <head>-tagin jälkeen

# Google Analytics -tagi
GOOGLE_TAG='    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9QDDPLJZ9P"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('\''js'\'', new Date());

      gtag('\''config'\'', '\''G-9QDDPLJZ9P'\'');
    </script>'

# Etsi kaikki HTML-tiedostot työhakemistosta ja sen alihakemistoista
HTML_FILES=$(find . -name "*.html")

TOTAL_FILES=$(echo "$HTML_FILES" | wc -l)
PROCESSED_FILES=0
MODIFIED_FILES=0

echo "Löydettiin $TOTAL_FILES HTML-tiedostoa."
echo "Aloitetaan Google Analytics -tagin lisääminen..."

for file in $HTML_FILES; do
    PROCESSED_FILES=$((PROCESSED_FILES + 1))
    echo "Käsitellään tiedostoa ($PROCESSED_FILES/$TOTAL_FILES): $file"
    
    # Tarkista, onko Google Analytics -tagi jo lisätty
    if grep -q "googletagmanager\.com/gtag/js?id=G-9QDDPLJZ9P" "$file"; then
        echo "  - Google Analytics -tagi on jo lisätty tiedostoon. Ohitetaan."
        continue
    fi
    
    # Lisää tagi <head>-tagin jälkeen
    if sed -i.bak "s|<head>|<head>\n$GOOGLE_TAG|" "$file"; then
        MODIFIED_FILES=$((MODIFIED_FILES + 1))
        echo "  - Google Analytics -tagi lisätty onnistuneesti."
        # Poista varmuuskopio
        rm "${file}.bak"
    else
        echo "  - Virhe: Tagia ei voitu lisätä. <head>-tagia ei löytynyt tai muu virhe."
    fi
done

echo ""
echo "Yhteenveto:"
echo "- Käsiteltiin $PROCESSED_FILES HTML-tiedostoa"
echo "- Google Analytics -tagi lisättiin $MODIFIED_FILES tiedostoon"
echo "- Valmiina!" 