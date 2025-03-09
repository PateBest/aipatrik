// Supabase-asetukset
// Käytetään config.js-tiedostossa määriteltyjä arvoja
// Tämä mahdollistaa avainten turvallisen hallinnan eri ympäristöissä

// Lomakkeen käsittely JavaScript
// Tämä koodi käsittelee yhteydenottolomakkeen toiminnallisuuden

document.addEventListener('DOMContentLoaded', function() {
    // Haetaan Supabase-asetukset konfiguraatiosta
    const SUPABASE_URL = window.CONFIG?.SUPABASE_URL || 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = window.CONFIG?.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
    
    // Luodaan Supabase-asiakas
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Haetaan lomake-elementti
    const contactForm = document.getElementById('contact-form');
    
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
                return;
            }
            
            // Tarkistetaan sähköpostiosoitteen muoto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('error-message').textContent = 'Syötä kelvollinen sähköpostiosoite.';
                document.getElementById('error-message').style.display = 'block';
                return;
            }
            
            // Luodaan formData-objekti Supabasea varten
            const formData = { name, email, subject, message };
            
            // Haetaan submit-painike ja latausikoni
            const submitButton = document.getElementById('submit-button');
            const loadingIcon = document.getElementById('loading');
            
            // Näytetään latausikoni ja disabloidaan painike
            if (loadingIcon && submitButton) {
                loadingIcon.style.display = 'inline-block';
                submitButton.disabled = true;
            }
            
            try {
                // Lähetetään tiedot Supabaseen
                const { data, error } = await supabaseClient
                    .from('contact_messages')
                    .insert([formData]);
                
                if (error) throw error;
                
                // Näytetään onnistumisviesti
                document.getElementById('success-message').style.display = 'block';
                
                // Tyhjennetään lomake
                contactForm.reset();
                
                // Piilotetaan onnistumisviesti 5 sekunnin kuluttua
                setTimeout(function() {
                    document.getElementById('success-message').style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Virhe lomakkeen lähetyksessä:', error);
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = 
                    'Viestin lähetyksessä tapahtui virhe: ' + (error.message || 'Tuntematon virhe');
            } finally {
                // Piilotetaan latausikoni ja palautetaan painike
                if (loadingIcon && submitButton) {
                    loadingIcon.style.display = 'none';
                    submitButton.disabled = false;
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
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(this, emailRegex.test(this.value));
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
    }
}); 