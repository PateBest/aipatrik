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
        // Käytetään suhteellista polkua nykyiseen sivuun nähden
        // Määritellään mahdolliset polut config.runtime.js-tiedostolle
        const possiblePaths = [
            './config.runtime.js',                // Suhteellinen polku nykyiseen sivuun
            '../config.runtime.js',               // Yksi taso ylöspäin
            '/config.runtime.js',                 // Juurihakemisto
            '/aipatrik/config.runtime.js',        // GitHub Pages -alihakemisto
            'config.runtime.js'                   // Pelkkä tiedostonimi
        ];
        
        console.log('Yritetään ladata konfiguraatiota useista mahdollisista poluista');
        
        // Yritetään ladata konfiguraatio kaikista mahdollisista poluista
        for (const path of possiblePaths) {
            try {
                console.log('Yritetään ladata konfiguraatiota polusta:', path);
                const response = await fetch(path);
                
                if (response.ok) {
                    const data = await response.text();
                    if (data) {
                        // Suoritetaan ladattu konfiguraatio
                        try {
                            eval(data);
                            console.log('Runtime-konfiguraatio ladattu onnistuneesti polusta:', path);
                            
                            // Tarkistetaan, että konfiguraatio sisältää tarvittavat arvot
                            if (!window.CONFIG.SUPABASE_URL || !window.CONFIG.SUPABASE_ANON_KEY) {
                                console.warn('Runtime-konfiguraatio ei sisällä kaikkia tarvittavia arvoja');
                            } else {
                                console.log('Konfiguraatio sisältää kaikki tarvittavat arvot');
                                return true; // Konfiguraatio ladattu onnistuneesti
                            }
                        } catch (e) {
                            console.error('Virhe runtime-konfiguraation suorittamisessa:', e);
                        }
                    }
                }
            } catch (pathError) {
                console.log('Virhe polun', path, 'lataamisessa:', pathError);
            }
        }
        
        // Jos tänne asti päästään, konfiguraatiota ei löytynyt mistään polusta
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Kehitysympäristö: Käytetään kehitysympäristön konfiguraatiota');
        } else {
            console.warn('Tuotantoympäristö: Runtime-konfiguraatiota ei löytynyt mistään polusta. Lomake ei välttämättä toimi oikein.');
            
            // Yritetään vielä ladata konfiguraatio suoraan HTML-sivuun upotettuna
            if (window.INLINE_CONFIG && window.INLINE_CONFIG.SUPABASE_URL && window.INLINE_CONFIG.SUPABASE_ANON_KEY) {
                window.CONFIG = window.INLINE_CONFIG;
                console.log('Käytetään HTML-sivuun upotettua konfiguraatiota');
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Virhe konfiguraation lataamisessa:', error);
        
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            console.warn('Tuotantoympäristö: Konfiguraation lataus epäonnistui. Lomake ei välttämättä toimi oikein.');
        }
        
        return false;
    }
}

// Yritetään ladata konfiguraatio
loadConfig(); 