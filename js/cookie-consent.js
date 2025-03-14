// Cookie Consent Script for AI Patrik

// Tarkistetaan onko evästeiden suostumus jo annettu
// Tämä suoritetaan heti kun skripti ladataan
if (!localStorage.getItem('cookieConsent')) {
    // Jos DOMContentLoaded on jo tapahtunut, luodaan banneri heti
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        createCookieConsentBanner();
    } else {
        // Muuten odotetaan DOMContentLoaded-tapahtumaa
        document.addEventListener('DOMContentLoaded', function() {
            createCookieConsentBanner();
        });
    }
}

function createCookieConsentBanner() {
    // Tarkistetaan onko banneri jo luotu
    if (document.querySelector('.cookie-consent')) {
        return;
    }
    
    // Create the banner element
    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    
    // Create the content
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <h3><i class="fas fa-cookie-bite"></i> Evästeiden käyttö</h3>
                <p>Käytämme evästeitä parantaaksemme sivuston käyttökokemusta ja analysoidaksemme liikennettä. 
                Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.</p>
            </div>
            <div class="cookie-buttons">
                <button class="cookie-accept">Hyväksyn</button>
                <button class="btn-secondary cookie-more-info">Lisätietoja</button>
            </div>
        </div>
    `;
    
    // Add the banner to the body
    document.body.appendChild(banner);
    
    // Add animation class after a small delay to trigger animation
    setTimeout(() => {
        banner.classList.add('visible');
    }, 100);
    
    // Add event listeners to buttons
    const acceptButton = banner.querySelector('.cookie-accept');
    const moreInfoButton = banner.querySelector('.cookie-more-info');
    
    acceptButton.addEventListener('click', function() {
        acceptCookies();
        hideBanner(banner);
        loadGoogleAnalytics();
        
        // Show a brief thank you message
        showThankYouMessage();
    });
    
    moreInfoButton.addEventListener('click', function() {
        // Determine the correct path to the privacy policy page
        const path = window.location.pathname;
        let basePath = '';
        
        // Count directory levels to determine how many "../" we need
        const pathParts = path.split('/').filter(part => part.length > 0);
        
        // If we're in a subdirectory, calculate the correct path
        if (pathParts.length > 0) {
            // For each directory level, we need to go up one level
            basePath = '../'.repeat(pathParts.length);
        }
        
        const privacyPolicyPath = basePath + 'pages/tietosuojakaytanto.html';
        
        // Redirect to privacy policy page
        window.open(privacyPolicyPath, '_blank');
    });
}

function showThankYouMessage() {
    // Create a brief thank you notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, var(--accent-color), #0066cc)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Kiitos! Evästeasetukset tallennettu.';
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function acceptCookies() {
    // Save consent to localStorage
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
}

function loadGoogleAnalytics() {
    // Load Google Analytics
    (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-9QDDPLJZ9P';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9QDDPLJZ9P');
    })();
}

function hideBanner(banner) {
    // Add hiding class to trigger hide animation
    banner.classList.add('hiding');
    
    // Remove the banner after animation completes
    setTimeout(() => {
        if (banner && banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }
    }, 500); // Match this with the CSS transition duration
} 