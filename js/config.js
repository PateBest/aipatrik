// Supabase-konfiguraatio
// Tämä tiedosto ladataan ennen muita JavaScript-tiedostoja

// Määritellään globaali konfiguraatio-objekti
window.CONFIG = {
    // Oletusarvot kehitysympäristöä varten
    SUPABASE_URL: 'YOUR_SUPABASE_URL',
    SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY'
};

// Funktio, joka yrittää ladata konfiguraation ulkoisesta tiedostosta
function loadConfig() {
    fetch('/config.runtime.js')
        .then(response => {
            if (!response.ok) {
                console.log('Käytetään kehitysympäristön konfiguraatiota');
                return;
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                // Suoritetaan ladattu konfiguraatio
                try {
                    eval(data);
                    console.log('Runtime-konfiguraatio ladattu');
                } catch (e) {
                    console.error('Virhe runtime-konfiguraation lataamisessa:', e);
                }
            }
        })
        .catch(error => {
            console.log('Käytetään kehitysympäristön konfiguraatiota');
        });
}

// Yritetään ladata konfiguraatio
loadConfig(); 