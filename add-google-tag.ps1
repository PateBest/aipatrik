# Google Analytics -tagin lisääminen kaikkiin HTML-tiedostoihin
# Tämä skripti etsii kaikki HTML-tiedostot ja lisää Google Analytics -tagin heti <head>-tagin jälkeen

$googleTag = @"
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9QDDPLJZ9P"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9QDDPLJZ9P');
    </script>
"@

# Etsi kaikki HTML-tiedostot työhakemistosta ja sen alihakemistoista
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

$totalFiles = $htmlFiles.Count
$processedFiles = 0
$modifiedFiles = 0

Write-Host "Löydettiin $totalFiles HTML-tiedostoa."
Write-Host "Aloitetaan Google Analytics -tagin lisääminen..."

foreach ($file in $htmlFiles) {
    $processedFiles++
    Write-Host "Käsitellään tiedostoa ($processedFiles/$totalFiles): $($file.FullName)"
    
    # Lue tiedoston sisältö
    $content = Get-Content -Path $file.FullName -Raw
    
    # Tarkista, onko Google Analytics -tagi jo lisätty
    if ($content -match "googletagmanager\.com/gtag/js\?id=G-9QDDPLJZ9P") {
        Write-Host "  - Google Analytics -tagi on jo lisätty tiedostoon. Ohitetaan."
        continue
    }
    
    # Lisää tagi <head>-tagin jälkeen
    $newContent = $content -replace "(<head>[\s]*)", "`$1`r`n$googleTag"
    
    # Tallenna muutokset, jos sisältö muuttui
    if ($newContent -ne $content) {
        $newContent | Set-Content -Path $file.FullName -NoNewline
        $modifiedFiles++
        Write-Host "  - Google Analytics -tagi lisätty onnistuneesti."
    } else {
        Write-Host "  - Virhe: Tagia ei voitu lisätä. <head>-tagia ei löytynyt tai muu virhe."
    }
}

Write-Host "`nYhteenveto:"
Write-Host "- Käsiteltiin $processedFiles HTML-tiedostoa"
Write-Host "- Google Analytics -tagi lisättiin $modifiedFiles tiedostoon"
Write-Host "- Valmiina!" 