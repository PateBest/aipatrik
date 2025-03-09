// Supabase-konfiguraatio
// Tämä tiedosto ladataan ennen muita JavaScript-tiedostoja

// Määritellään globaali konfiguraatio-objekti
window.CONFIG = {
    // Oletusarvot kehitysympäristöä varten
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: ''
};

// Funktio, joka yrittää ladata konfiguraation ulkoisesta tiedostosta
async function loadConfig() {
    try {
        const response = await fetch('/config.runtime.js');
        
        if (!response.ok) {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('Kehitysympäristö: Käytetään kehitysympäristön konfiguraatiota');
            } else {
                console.warn('Tuotantoympäristö: Runtime-konfiguraatiota ei löytynyt. Lomake ei välttämättä toimi oikein.');
            }
            return;
        }
        
        const data = await response.text();
        
        if (data) {
            // Suoritetaan ladattu konfiguraatio
            try {
                eval(data);
                console.log('Runtime-konfiguraatio ladattu onnistuneesti');
                
                // Tarkistetaan, että konfiguraatio sisältää tarvittavat arvot
                if (!window.CONFIG.SUPABASE_URL || !window.CONFIG.SUPABASE_ANON_KEY) {
                    console.warn('Runtime-konfiguraatio ei sisällä kaikkia tarvittavia arvoja');
                }
            } catch (e) {
                console.error('Virhe runtime-konfiguraation suorittamisessa:', e);
            }
        }
    } catch (error) {
        console.error('Virhe runtime-konfiguraation lataamisessa:', error);
        
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            console.warn('Tuotantoympäristö: Konfiguraation lataus epäonnistui. Lomake ei välttämättä toimi oikein.');
        }
    }
}

// Yritetään ladata konfiguraatio
loadConfig(); 