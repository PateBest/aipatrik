// Funktio aktiivisen navigointilinkin korostamiseen
document.addEventListener('DOMContentLoaded', function() {
    // Hae nykyinen sivu URL:sta
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Hae kaikki navigointilinkit
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Käy läpi kaikki linkit
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        // Tarkista vastaako linkki nykyistä sivua
        let isActive = false;
        
        // Etusivu
        if ((currentPage === '' || currentPage === 'index.html') && 
            (linkHref === '../index.html' || linkHref === 'index.html')) {
            isActive = true;
        }
        // Muut sivut
        else if (currentPage === linkPage) {
            isActive = true;
        }
        
        // Jos linkki on aktiivinen
        if (isActive) {
            // Poista mahdolliset inline-tyylit jos niitä on
            if (link.hasAttribute('onmouseover')) {
                link.removeAttribute('onmouseover');
            }
            if (link.hasAttribute('onmouseout')) {
                link.removeAttribute('onmouseout');
            }
            
            // Lisää parent li-elementille active-luokka
            link.parentElement.classList.add('active');
            
            console.log('Aktiivinen sivu: ' + currentPage + ', Aktiivinen linkki: ' + linkHref);
        }
    });
}); 