// Sivuston konfiguraatio
// Tämä tiedosto ladataan ennen muita JavaScript-tiedostoja

// Määritellään globaali konfiguraatio-objekti
window.CONFIG = {
    // Sivuston yleiset asetukset
    SITE_NAME: 'AI Patrik',
    SITE_URL: 'https://patebest.github.io/aipatrik/',
    CONTACT_EMAIL: 'aipatrik@outlook.com',
    
    // Formspree-asetukset
    FORMSPREE_ENDPOINT: 'https://formspree.io/f/mpwpzalw'
};

// Funktio, joka tarkistaa onko käyttäjä mobiililaitteella
window.isMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

console.log('Sivuston konfiguraatio ladattu onnistuneesti'); 