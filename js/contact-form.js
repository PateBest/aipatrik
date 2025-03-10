// Lomakkeen käsittely JavaScript
// Tämä koodi käsittelee yhteydenottolomakkeen toiminnallisuuden

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form script loaded');
    
    // Alustetaan lomake
    initializeForm();
    
    // Funktio lomakkeen alustamiseen
    function initializeForm() {
        // Haetaan lomake-elementti
        const contactForm = document.getElementById('contact-form');
        
        // Ponnahdusilmoituksen elementit
        const popupNotification = document.getElementById('popup-notification');
        const popupTitle = document.getElementById('popup-title');
        const popupMessage = document.getElementById('popup-message');
        
        // Funktio ponnahdusilmoituksen näyttämiseen
        function showPopup(isSuccess, title, message) {
            // Asetetaan oikea tyyli ja sisältö
            if (isSuccess) {
                popupNotification.className = 'popup-notification success show';
                popupNotification.querySelector('i').className = 'fas fa-check-circle';
            } else {
                popupNotification.className = 'popup-notification error show';
                popupNotification.querySelector('i').className = 'fas fa-exclamation-circle';
            }
            
            popupTitle.textContent = title;
            popupMessage.textContent = message;
            
            // Näytetään ilmoitus
            popupNotification.classList.add('show');
            
            // Piilotetaan ilmoitus automaattisesti 5 sekunnin kuluttua
            setTimeout(function() {
                popupNotification.classList.remove('show');
            }, 5000);
        }
        
        // Funktio ponnahdusilmoituksen sulkemiseen
        window.closePopup = function() {
            popupNotification.classList.remove('show');
        };
        
        // Jos lomake löytyy, lisätään tapahtumankäsittelijä
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Formspree hoitaa lomakkeen lähetyksen, joten emme estä oletustoimintaa
                // Tässä voimme kuitenkin tehdä validointia ennen lähetystä
                
                // Kerätään lomakkeen tiedot
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Tarkistetaan, että kaikki kentät on täytetty
                if (!name || !email || !subject || !message) {
                    e.preventDefault(); // Estetään lähetys, jos validointi epäonnistuu
                    document.getElementById('error-message').textContent = 'Täytä kaikki kentät.';
                    document.getElementById('error-message').style.display = 'block';
                    showPopup(false, 'Virhe!', 'Täytä kaikki kentät.');
                    return;
                }
                
                // Tarkistetaan sähköpostiosoitteen muoto
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    e.preventDefault(); // Estetään lähetys, jos validointi epäonnistuu
                    document.getElementById('error-message').textContent = 'Syötä kelvollinen sähköpostiosoite.';
                    document.getElementById('error-message').style.display = 'block';
                    showPopup(false, 'Virhe!', 'Syötä kelvollinen sähköpostiosoite.');
                    return;
                }
                
                // Haetaan submit-painike ja latausikoni
                const submitButton = document.getElementById('submit-button');
                const loadingIcon = document.getElementById('loading');
                
                // Näytetään latausikoni ja disabloidaan painike
                if (loadingIcon && submitButton) {
                    loadingIcon.style.display = 'inline-block';
                    submitButton.disabled = true;
                    // Lisätään visuaalinen indikaattori
                    submitButton.style.opacity = '0.7';
                    submitButton.querySelector('span').textContent = 'Lähetetään...';
                }
                
                // Formspree hoitaa lomakkeen lähetyksen ja uudelleenohjauksen
                // Tässä vaiheessa lomake lähetetään normaalisti
            });
        }
    }
}); 