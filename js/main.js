// AI Patrik - Main JavaScript file

// Newsletter form submission - kommentoitu pois, koska lomake on "Tulossa pian" -tilassa
/*
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Tässä voisi olla toiminnallisuus, joka lähettää sähköpostin palvelimelle
            alert('Kiitos tilauksestasi! Uutiskirje lähetetään osoitteeseen: ' + email);
            emailInput.value = '';
        }
    });
}
*/

// Aktiivisen navigointilinkin korostus
document.addEventListener('DOMContentLoaded', function() {
    // Haetaan nykyinen sivu URL:sta
    const currentPage = window.location.pathname.split('/').pop();
    
    // Haetaan kaikki navigointilinkit
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Käydään läpi kaikki linkit ja lisätään active-luokka nykyiselle sivulle
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
});

// Mobiilinavigaation toiminnallisuus
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelectorAll('nav ul li');
    
    // Luodaan sulkemispainike ja lisätään se bodyyn
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Sulje valikko');
    
    // Lisätään sulkemispainike bodyyn, jotta se voidaan asemoida fixed-positiolla
    document.body.appendChild(closeBtn);

    // Funktio valikon sulkemiseen
    function closeNavMenu() {
        document.body.classList.remove('nav-open');
        navList.classList.remove('active');
        hamburger.classList.remove('open');
    }
    
    // Asetetaan animaatioindeksi jokaiselle navigaatioelementille
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Estetään tapahtuman kupliminen
            document.body.classList.toggle('nav-open');
            navList.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
        
        // Suljetaan valikko, kun klikataan sulkemispainiketta
        closeBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            closeNavMenu();
        });
        
        // Suljetaan valikko, kun klikataan linkkiä
        navItems.forEach(item => {
            item.addEventListener('click', closeNavMenu);
        });
    }
});

// ... existing code ... 