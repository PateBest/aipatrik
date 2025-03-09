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
        const configPath = window.location.pathname.includes('/aipatrik/') ? '/aipatrik/config.runtime.js' : '/config.runtime.js';
        console.log('Yritetään ladata konfiguraatio polusta:', configPath);
        
        const response = await fetch(configPath);
        
        if (!response.ok) {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('Kehitysympäristö: Käytetään kehitysympäristön konfiguraatiota');
            } else {
                console.warn('Tuotantoympäristö: Runtime-konfiguraatiota ei löytynyt polusta ' + configPath + '. Lomake ei välttämättä toimi oikein.');
                // Yritetään vielä toista polkua
                const altConfigPath = configPath.startsWith('/aipatrik/') ? '/config.runtime.js' : '/aipatrik/config.runtime.js';
                console.log('Yritetään vaihtoehtoista polkua:', altConfigPath);
                try {
                    const altResponse = await fetch(altConfigPath);
                    if (altResponse.ok) {
                        const altData = await altResponse.text();
                        if (altData) {
                            eval(altData);
                            console.log('Runtime-konfiguraatio ladattu onnistuneesti vaihtoehtoisesta polusta');
                            return;
                        }
                    } else {
                        console.warn('Vaihtoehtoinen konfiguraation lataus epäonnistui.');
                    }
                } catch (altError) {
                    console.error('Virhe vaihtoehtoisen konfiguraation lataamisessa:', altError);
                }
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