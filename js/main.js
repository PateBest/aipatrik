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
}); 