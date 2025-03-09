// Supabase-asetukset
// Käytetään config.js-tiedostossa määriteltyjä arvoja
// Tämä mahdollistaa avainten turvallisen hallinnan eri ympäristöissä

// Lomakkeen käsittely JavaScript
// Tämä koodi käsittelee yhteydenottolomakkeen toiminnallisuuden

document.addEventListener('DOMContentLoaded', function() {
    // Haetaan Supabase-asetukset konfiguraatiosta
    // Yritetään käyttää myös inline-konfiguraatiota, jos se on saatavilla
    const SUPABASE_URL = window.CONFIG?.SUPABASE_URL || window.INLINE_CONFIG?.SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = window.CONFIG?.SUPABASE_ANON_KEY || window.INLINE_CONFIG?.SUPABASE_ANON_KEY || '';
    
    console.log('Käytetään Supabase-asetuksia:', 
        SUPABASE_URL ? 'URL on määritelty' : 'URL puuttuu', 
        SUPABASE_ANON_KEY ? 'ANON_KEY on määritelty' : 'ANON_KEY puuttuu');
    
    // Tarkistetaan, onko Supabase-asetukset määritelty
    const isSupabaseConfigured = 
        SUPABASE_URL && 
        SUPABASE_ANON_KEY && 
        SUPABASE_URL !== 'YOUR_SUPABASE_URL' && 
        SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
    
    // Luodaan Supabase-asiakas vain jos asetukset ovat kunnossa
    let supabaseClient = null;
    if (isSupabaseConfigured) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase-yhteys muodostettu onnistuneesti');
        } catch (error) {
            console.error('Virhe Supabase-yhteyden muodostamisessa:', error);
        }
    } else {
        console.warn('Supabase-asetukset puuttuvat tai ovat oletusarvoja. Lomake ei toimi tuotantoympäristössä.');
        console.log('window.CONFIG:', window.CONFIG);
        console.log('window.INLINE_CONFIG:', window.INLINE_CONFIG);
    }
    
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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Piilotetaan mahdolliset aiemmat viestit
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('error-message').style.display = 'none';
            
            // Kerätään lomakkeen tiedot
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Tarkistetaan, että kaikki kentät on täytetty
            if (!name || !email || !subject || !message) {
                document.getElementById('error-message').textContent = 'Täytä kaikki kentät.';
                document.getElementById('error-message').style.display = 'block';
                showPopup(false, 'Virhe!', 'Täytä kaikki kentät.');
                return;
            }
            
            // Tarkistetaan sähköpostiosoitteen muoto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('error-message').textContent = 'Syötä kelvollinen sähköpostiosoite.';
                document.getElementById('error-message').style.display = 'block';
                showPopup(false, 'Virhe!', 'Syötä kelvollinen sähköpostiosoite.');
                return;
            }
            
            // Luodaan formData-objekti Supabasea varten
            const formData = { 
                name, 
                email, 
                subject, 
                message,
                created_at: new Date().toISOString()
            };
            
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
            
            try {
                // Tarkistetaan Supabase-yhteys
                if (!isSupabaseConfigured || !supabaseClient) {
                    // Kehitysympäristössä simuloidaan onnistunutta lähetystä
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('Kehitysympäristö: Simuloidaan onnistunutta lähetystä', formData);
                        // Simuloidaan viivettä
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        throw new Error('Supabase-asetukset puuttuvat. Ota yhteyttä sivuston ylläpitäjään.');
                    }
                } else {
                    // Lähetetään tiedot Supabaseen
                    const { data, error } = await supabaseClient
                        .from('contact_messages')
                        .insert([formData]);
                    
                    if (error) throw error;
                }
                
                // Näytetään onnistumisviesti
                document.getElementById('success-message').style.display = 'block';
                
                // Näytetään ponnahdusilmoitus
                showPopup(true, 'Onnistui!', 'Viestisi on lähetetty onnistuneesti. Kiitos yhteydenotostasi!');
                
                // Tyhjennetään lomake
                contactForm.reset();
                
                // Piilotetään onnistumisviesti 5 sekunnin kuluttua
                setTimeout(function() {
                    document.getElementById('success-message').style.display = 'none';
                }, 5000);
                
                // Vieritetään sivu ylös, jotta käyttäjä näkee ilmoituksen
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            } catch (error) {
                console.error('Virhe lomakkeen lähetyksessä:', error);
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = 
                    'Viestin lähetyksessä tapahtui virhe: ' + (error.message || 'Tuntematon virhe');
                
                // Näytetään ponnahdusilmoitus
                showPopup(false, 'Virhe!', 'Viestin lähetyksessä tapahtui virhe. Ole hyvä ja yritä uudelleen.');
            } finally {
                // Piilotetaan latausikoni ja palautetaan painike
                if (loadingIcon && submitButton) {
                    loadingIcon.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.querySelector('span').textContent = 'Lähetä viesti';
                }
            }
        });
    }
    
    // Lisätään tapahtumankäsittelijät lomakkeen kenttien validointia varten
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Funktio, joka tarkistaa kentän arvon ja lisää/poistaa virheluokan
    function validateField(field, isValid) {
        if (field) {
            if (!isValid) {
                field.classList.add('error-field');
            } else {
                field.classList.remove('error-field');
            }
        }
    }
    
    // Lisätään blur-tapahtumankäsittelijät kenttien validointia varten
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
        
        // Lisätään myös input-tapahtumankäsittelijä reaaliaikaista validointia varten
        nameInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this, true);
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(this, emailRegex.test(this.value));
        });
        
        // Lisätään myös input-tapahtumankäsittelijä reaaliaikaista validointia varten
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                validateField(this, true);
            }
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
        
        // Lisätään myös input-tapahtumankäsittelijä reaaliaikaista validointia varten
        subjectInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this, true);
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
        
        // Lisätään myös input-tapahtumankäsittelijä reaaliaikaista validointia varten
        messageInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this, true);
            }
        });
    }
}); 