// Supabase-konfiguraation testiskripti
// Tämä skripti auttaa diagnosoimaan konfiguraation latausongelmia

document.addEventListener('DOMContentLoaded', function() {
    console.log('Test-config.js loaded');
    
    // Luodaan lokielementti, jos sitä ei ole
    let logElement = document.getElementById('config-debug-log');
    if (!logElement) {
        logElement = document.createElement('div');
        logElement.id = 'config-debug-log';
        logElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        logElement.style.color = '#00ff00';
        logElement.style.fontFamily = 'monospace';
        logElement.style.padding = '10px';
        logElement.style.borderRadius = '5px';
        logElement.style.marginTop = '20px';
        logElement.style.whiteSpace = 'pre-wrap';
        logElement.style.maxHeight = '300px';
        logElement.style.overflow = 'auto';
        
        // Lisätään elementti sivulle
        const container = document.querySelector('.test-container') || document.body;
        container.appendChild(logElement);
    }
    
    // Funktio lokin kirjoittamiseen
    function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        let color = '#00ff00'; // default: green
        
        if (type === 'error') color = '#ff5555';
        if (type === 'warning') color = '#ffaa00';
        if (type === 'success') color = '#00ff99';
        
        const logMessage = `[${timestamp}] ${message}`;
        console.log(logMessage);
        
        const logLine = document.createElement('div');
        logLine.style.color = color;
        logLine.textContent = logMessage;
        logElement.appendChild(logLine);
        
        // Vieritetään loki alas
        logElement.scrollTop = logElement.scrollHeight;
    }
    
    // Aloitetaan testaus
    log('Aloitetaan konfiguraation testaus', 'info');
    
    // Tarkistetaan window.CONFIG
    if (window.CONFIG) {
        log('window.CONFIG löydetty', 'success');
        log(`SUPABASE_URL: ${window.CONFIG.SUPABASE_URL ? 'Määritelty' : 'Puuttuu'}`, window.CONFIG.SUPABASE_URL ? 'success' : 'error');
        log(`SUPABASE_ANON_KEY: ${window.CONFIG.SUPABASE_ANON_KEY ? 'Määritelty' : 'Puuttuu'}`, window.CONFIG.SUPABASE_ANON_KEY ? 'success' : 'error');
    } else {
        log('window.CONFIG ei löydy', 'error');
    }
    
    // Tarkistetaan window.INLINE_CONFIG
    if (window.INLINE_CONFIG) {
        log('window.INLINE_CONFIG löydetty', 'success');
        log(`SUPABASE_URL: ${window.INLINE_CONFIG.SUPABASE_URL ? 'Määritelty' : 'Puuttuu'}`, window.INLINE_CONFIG.SUPABASE_URL ? 'success' : 'error');
        log(`SUPABASE_ANON_KEY: ${window.INLINE_CONFIG.SUPABASE_ANON_KEY ? 'Määritelty' : 'Puuttuu'}`, window.INLINE_CONFIG.SUPABASE_ANON_KEY ? 'success' : 'error');
    } else {
        log('window.INLINE_CONFIG ei löydy', 'error');
    }
    
    // Tarkistetaan config.runtime.js-tiedoston lataus
    log('Tarkistetaan config.runtime.js-tiedoston saatavuus...', 'info');
    
    // Testataan eri polkuja
    const paths = [
        './config.runtime.js',
        '../config.runtime.js',
        '/config.runtime.js',
        '/aipatrik/config.runtime.js',
        'config.runtime.js',
        './js/config.runtime.js',
        '../js/config.runtime.js',
        '/js/config.runtime.js',
        '/aipatrik/js/config.runtime.js',
        './pages/config.runtime.js',
        '../pages/config.runtime.js',
        '/pages/config.runtime.js',
        '/aipatrik/pages/config.runtime.js'
    ];
    
    // Testataan jokainen polku
    let successfulPaths = 0;
    
    function testNextPath(index) {
        if (index >= paths.length) {
            log(`Testaus valmis. ${successfulPaths} polkua ${paths.length} onnistui.`, successfulPaths > 0 ? 'success' : 'error');
            return;
        }
        
        const path = paths[index];
        fetch(path)
            .then(response => {
                if (response.ok) {
                    log(`✓ Polku toimii: ${path}`, 'success');
                    successfulPaths++;
                } else {
                    log(`✗ Polku ei toimi: ${path} (Status: ${response.status})`, 'error');
                }
            })
            .catch(error => {
                log(`✗ Virhe polussa: ${path} (${error.message})`, 'error');
            })
            .finally(() => {
                testNextPath(index + 1);
            });
    }
    
    testNextPath(0);
    
    // Tarkistetaan HTML-sivu
    log('Tarkistetaan HTML-sivu...', 'info');
    const html = document.documentElement.outerHTML;
    
    if (html.includes('window.INLINE_CONFIG')) {
        log('HTML sisältää INLINE_CONFIG-määrityksen', 'success');
    } else {
        log('HTML ei sisällä INLINE_CONFIG-määritystä', 'error');
        log('Placeholder ei ole korvautunut GitHub Actionsin toimesta', 'warning');
    }
    
    // Tarkistetaan Supabase-kirjasto
    log('Tarkistetaan Supabase-kirjasto...', 'info');
    if (typeof supabase !== 'undefined') {
        log('Supabase-kirjasto on ladattu', 'success');
    } else {
        log('Supabase-kirjastoa ei ole ladattu', 'error');
    }
    
    log('Konfiguraation testaus valmis', 'info');
}); 