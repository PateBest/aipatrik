// AI Patrik - AI Agentti autentikaatio

// Käyttäjätiedot (tuotantokäytössä nämä tulisi tallentaa turvallisemmin)
const validCredentials = {
    username: "ai_agentti",
    password: "aipatrik2025"
};

// Tarkistetaan onko käyttäjä kirjautunut sisään
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('aipatrik_auth');
    
    // Jos ei ole kirjautunut ja sivu ei ole login.html, ohjataan kirjautumissivulle
    if (!isAuthenticated && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    // Jos on kirjautunut ja sivu on login.html, ohjataan hallintapaneeliin
    if (isAuthenticated && window.location.href.includes('login.html')) {
        window.location.href = 'dashboard.html';
        return true;
    }
    
    return isAuthenticated;
}

// Kirjautumislomakkeen käsittely
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Tarkistetaan käyttäjätiedot
            if (username === validCredentials.username && password === validCredentials.password) {
                // Tallennetaan kirjautumistila sessionStorageen
                sessionStorage.setItem('aipatrik_auth', 'true');
                sessionStorage.setItem('aipatrik_username', username);
                
                // Ohjataan hallintapaneeliin
                window.location.href = 'dashboard.html';
            } else {
                // Näytetään virheviesti
                errorMessage.classList.add('show');
                
                // Piilotetaan virheviesti 3 sekunnin kuluttua
                setTimeout(function() {
                    errorMessage.classList.remove('show');
                }, 3000);
            }
        });
    }
    
    // Tarkistetaan kirjautumistila sivun latautuessa
    checkAuthentication();
    
    // Uloskirjautumispainikkeen toiminnallisuus
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Poistetaan kirjautumistiedot
            sessionStorage.removeItem('aipatrik_auth');
            sessionStorage.removeItem('aipatrik_username');
            
            // Ohjataan kirjautumissivulle
            window.location.href = 'login.html';
        });
    }
}); 