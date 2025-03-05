// AI Patrik - Main JavaScript file

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Aktiivisen navigointilinkin korostus
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Tarkistetaan, onko linkki aktiivinen
        if (currentPage.includes(linkPath) && linkPath !== 'index.html') {
            link.style.color = 'var(--accent-color)';
        } else if (currentPage.endsWith('/') || currentPage.endsWith('index.html')) {
            // Jos ollaan etusivulla
            if (linkPath === 'index.html') {
                link.style.color = 'var(--accent-color)';
            }
        }
    });

    // Mobiilinavigaation toiminnallisuus
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelectorAll('nav ul li');
    
    // Lisätään indeksi jokaiselle navigaatioelementille animaatiota varten
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('open');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Suljetaan valikko, kun linkkiä klikataan
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navList.classList.remove('active');
            hamburger.classList.remove('open');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Suljetaan valikko, kun klikataan valikon ulkopuolelta
    document.addEventListener('click', function(event) {
        if (navList.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-nav-toggle')) {
            navList.classList.remove('active');
            hamburger.classList.remove('open');
            document.body.classList.remove('nav-open');
        }
    });
}); 