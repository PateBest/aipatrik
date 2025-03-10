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

// Työkalut-sivun hakukentän ja filtterien toiminnallisuus
document.addEventListener('DOMContentLoaded', function() {
    // Tarkistetaan, ollaanko työkalut-sivulla
    if (window.location.pathname.includes('tyokalut.html')) {
        const searchInput = document.getElementById('tool-search');
        const searchButton = document.getElementById('search-button');
        const categoryFilter = document.getElementById('category-filter');
        const pricingFilter = document.getElementById('pricing-filter');
        const purposeFilter = document.getElementById('purpose-filter');
        const toolCards = document.querySelectorAll('.tool-card');
        const toolsSection = document.getElementById('tyokalut');
        const toolsContainer = document.querySelector('.tools-search-container');
        
        // Poistetaan scroll-tapahtumankäsittelijä, koska hakukentän ei tarvitse pysyä näkyvissä koko ajan
        
        // Siirretään työkalukortit hakukentän alle
        function moveToolsUnderSearch() {
            // Tarkistetaan, onko siirto jo tehty
            if (document.querySelector('.search-results-container')) {
                return;
            }
            
            // Varmistetaan, että hakukenttä on näkyvissä hakua suoritettaessa
            if (toolsContainer) {
                toolsContainer.style.display = 'block';
            }
            
            // Luodaan uusi container hakutuloksille
            const searchResultsContainer = document.createElement('div');
            searchResultsContainer.className = 'search-results-container';
            searchResultsContainer.style.textAlign = 'center';
            searchResultsContainer.style.display = 'flex';
            searchResultsContainer.style.flexDirection = 'column';
            searchResultsContainer.style.alignItems = 'center';
            searchResultsContainer.style.width = '100%';
            searchResultsContainer.style.maxWidth = '100%';
            searchResultsContainer.style.boxSizing = 'border-box';
            searchResultsContainer.style.padding = '0';
            searchResultsContainer.style.marginTop = '1rem';
            
            // Luodaan otsikko ja tulosten määrä
            const resultsHeader = document.createElement('div');
            resultsHeader.className = 'results-header';
            
            const resultsTitle = document.createElement('h2');
            resultsTitle.textContent = 'Hakutulokset';
            resultsHeader.appendChild(resultsTitle);
            
            const resultsCount = document.createElement('div');
            resultsCount.id = 'results-count';
            resultsCount.className = 'results-count';
            
            // Lisätään otsikko ja tulosten määrä hakutuloksiin
            searchResultsContainer.appendChild(resultsHeader);
            searchResultsContainer.appendChild(resultsCount);
            
            // Luodaan uusi div hakutulosten korteille
            const resultsGrid = document.createElement('div');
            resultsGrid.className = 'results-grid';
            resultsGrid.style.display = 'flex';
            resultsGrid.style.flexWrap = 'wrap';
            resultsGrid.style.justifyContent = 'center';
            resultsGrid.style.gap = '2rem';
            resultsGrid.style.width = '100%';
            resultsGrid.style.maxWidth = '1200px';
            resultsGrid.style.margin = '0 auto';
            resultsGrid.style.padding = '0';
            
            // Siirretään kortit alkuperäisestä gridistä uuteen
            const originalGrid = document.querySelector('.grid');
            if (originalGrid) {
                const cards = originalGrid.querySelectorAll('.tool-card');
                cards.forEach(card => {
                    // Kopioidaan kortti
                    const cardClone = card.cloneNode(true);
                    cardClone.style.width = '300px';
                    cardClone.style.margin = '1rem';
                    cardClone.style.display = 'flex';
                    cardClone.style.flexDirection = 'column';
                    
                    // Lisätään kopio uuteen gridiin
                    resultsGrid.appendChild(cardClone);
                });
                
                // Piilotetaan alkuperäinen grid
                originalGrid.style.display = 'none';
            }
            
            // Lisätään uusi grid hakutuloksiin
            searchResultsContainer.appendChild(resultsGrid);
            
            // Lisätään hakutulokset hakukentän alle
            toolsContainer.after(searchResultsContainer);
            
            // Luodaan "ei tuloksia" -viesti
            const noResultsElement = document.createElement('div');
            noResultsElement.id = 'no-results-message';
            noResultsElement.className = 'no-results';
            noResultsElement.innerHTML = 'Ei hakutuloksia. Kokeile eri hakuehtoja.<br><button id="reset-search" class="btn btn-small">Tyhjennä haku</button>';
            noResultsElement.style.textAlign = 'center';
            searchResultsContainer.appendChild(noResultsElement);
            
            // Lisätään tapahtumankäsittelijä reset-napille
            const resetButton = document.getElementById('reset-search');
            if (resetButton) {
                resetButton.addEventListener('click', resetSearch);
            }
            
            // Piilotetaan alkuperäinen työkalut-osio
            if (toolsSection) {
                toolsSection.style.display = 'none';
            }
        }

        // Hakutoiminto
        function performSearch() {
            // Varmistetaan, että hakukenttä on näkyvissä hakua suoritettaessa
            if (toolsContainer) {
                toolsContainer.style.display = 'block';
            }
            
            // Siirretään työkalukortit hakukentän alle, jos ei ole jo tehty
            moveToolsUnderSearch();
            
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedCategory = categoryFilter.value;
            const selectedPricing = pricingFilter.value;
            const selectedPurpose = purposeFilter.value;
            
            let visibleCount = 0;
            
            // Haetaan kortit hakutulosten gridistä
            const resultsGrid = document.querySelector('.results-grid');
            const cards = resultsGrid ? resultsGrid.querySelectorAll('.tool-card') : [];
            
            cards.forEach(card => {
                // Poista aiemmat korostukset
                const titleElement = card.querySelector('h3');
                const descriptionElement = card.querySelector('p');
                
                // Tallennetaan alkuperäiset tekstit, jos niitä ei ole vielä tallennettu
                if (!titleElement.dataset.originalText) {
                    titleElement.dataset.originalText = titleElement.textContent;
                }
                if (!descriptionElement.dataset.originalText) {
                    descriptionElement.dataset.originalText = descriptionElement.textContent;
                }
                
                // Palautetaan alkuperäiset tekstit
                titleElement.textContent = titleElement.dataset.originalText;
                descriptionElement.textContent = descriptionElement.dataset.originalText;
                
                const cardTitle = titleElement.textContent.toLowerCase();
                const cardDescription = descriptionElement.textContent.toLowerCase();
                const cardCategory = card.dataset.category;
                const cardPricing = card.dataset.pricing;
                const cardPurposes = card.dataset.purpose.split(',');
                
                // Tarkistetaan hakusanan vastaavuus
                const matchesSearch = searchTerm === '' || 
                                     cardTitle.includes(searchTerm) || 
                                     cardDescription.includes(searchTerm);
                
                // Tarkistetaan kategorian vastaavuus
                const matchesCategory = selectedCategory === 'all' || 
                                       cardCategory === selectedCategory;
                
                // Tarkistetaan hinnoittelun vastaavuus
                const matchesPricing = selectedPricing === 'all' || 
                                      cardPricing === selectedPricing;
                
                // Tarkistetaan käyttötarkoituksen vastaavuus
                const matchesPurpose = selectedPurpose === 'all' || 
                                      cardPurposes.includes(selectedPurpose);
                
                // Näytetään kortti vain, jos kaikki ehdot täyttyvät
                if (matchesSearch && matchesCategory && matchesPricing && matchesPurpose) {
                    card.style.display = 'flex';
                    visibleCount++;
                    
                    // Korostetaan hakusana, jos sellainen on annettu
                    if (searchTerm !== '') {
                        highlightSearchTerm(card, searchTerm);
                    }
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Päivitetään näkyvien työkalujen määrä
            updateResultsCount(visibleCount);
            
            // Tarkistetaan, onko yhtään korttia näkyvissä
            checkNoResults();
            
            // Lisätään hakutermi URL:iin, jotta sivu voidaan jakaa hakutuloksineen
            updateUrlWithSearchParams(searchTerm, selectedCategory, selectedPricing, selectedPurpose);
        }

        // Vierittää sivun hakutuloksiin
        function scrollToResults() {
            const searchResultsContainer = document.querySelector('.search-results-container');
            if (searchResultsContainer) {
                // Pieni viive, jotta DOM ehtii päivittyä
                setTimeout(() => {
                    // Vieritetään hakutuloksiin
                    searchResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        
        // Päivittää URL:n hakuparametreilla
        function updateUrlWithSearchParams(search, category, pricing, purpose) {
            const url = new URL(window.location.href);
            
            // Poistetaan vanhat parametrit
            url.searchParams.delete('search');
            url.searchParams.delete('category');
            url.searchParams.delete('pricing');
            url.searchParams.delete('purpose');
            
            // Lisätään uudet parametrit, jos ne eivät ole oletusarvoja
            if (search) url.searchParams.set('search', search);
            if (category !== 'all') url.searchParams.set('category', category);
            if (pricing !== 'all') url.searchParams.set('pricing', pricing);
            if (purpose !== 'all') url.searchParams.set('purpose', purpose);
            
            // Päivitetään URL ilman sivun uudelleenlatausta
            window.history.replaceState({}, '', url);
        }
        
        // Korostaa hakusanan tekstissä
        function highlightSearchTerm(card, term) {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title && title.textContent.toLowerCase().includes(term)) {
                const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
                title.innerHTML = title.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
            }
            
            if (description && description.textContent.toLowerCase().includes(term)) {
                const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
                description.innerHTML = description.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
            }
        }
        
        // Escapoi erikoismerkit regex-lausekkeessa
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        // Päivittää hakutulosten määrän
        function updateResultsCount(count) {
            let resultsCountElement = document.getElementById('results-count');
            
            if (resultsCountElement) {
                resultsCountElement.textContent = `Löydetty ${count} työkalua`;
                resultsCountElement.style.display = 'block';
                resultsCountElement.style.textAlign = 'center';
                resultsCountElement.style.width = '100%';
                resultsCountElement.style.marginBottom = '1rem';
            }
        }
        
        // Tarkistaa, onko hakutuloksia ja näyttää viestin, jos ei ole
        function checkNoResults() {
            let visibleCards = 0;
            const resultsGrid = document.querySelector('.results-grid');
            if (resultsGrid) {
                const cards = resultsGrid.querySelectorAll('.tool-card');
                cards.forEach(card => {
                    if (card.style.display !== 'none') {
                        visibleCards++;
                    }
                });
            }
            
            // Haetaan "ei tuloksia" -elementti
            let noResultsElement = document.getElementById('no-results-message');
            
            // Näytetään tai piilotetaan viesti
            if (noResultsElement) {
                if (visibleCards === 0) {
                    noResultsElement.style.display = 'block';
                } else {
                    noResultsElement.style.display = 'none';
                }
            }
        }
        
        // Tyhjentää haun ja filtterit
        function resetSearch() {
            searchInput.value = '';
            categoryFilter.value = 'all';
            pricingFilter.value = 'all';
            purposeFilter.value = 'all';
            
            // Näytetään kaikki kortit
            const resultsGrid = document.querySelector('.results-grid');
            if (resultsGrid) {
                const cards = resultsGrid.querySelectorAll('.tool-card');
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
            
            // Päivitetään hakutulosten määrä
            const totalCards = document.querySelectorAll('.results-grid .tool-card').length;
            updateResultsCount(totalCards);
            
            // Piilotetaan "ei tuloksia" -viesti
            const noResultsElement = document.getElementById('no-results-message');
            if (noResultsElement) {
                noResultsElement.style.display = 'none';
            }
            
            // Päivitetään URL
            updateUrlWithSearchParams('', 'all', 'all', 'all');
        }
        
        // Tarkistetaan URL-parametrit sivun latautuessa
        function checkUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            const categoryParam = urlParams.get('category');
            const pricingParam = urlParams.get('pricing');
            const purposeParam = urlParams.get('purpose');
            
            if (searchParam) searchInput.value = searchParam;
            if (categoryParam) categoryFilter.value = categoryParam;
            if (pricingParam) pricingFilter.value = pricingParam;
            if (purposeParam) purposeFilter.value = purposeParam;
            
            // Jos parametreja löytyi, suoritetaan haku
            if (searchParam || categoryParam || pricingParam || purposeParam) {
                performSearch();
            }
        }
        
        // Tapahtumankäsittelijät
        if (searchInput) {
            // Suoritetaan haku reaaliajassa käyttäjän kirjoittaessa
            searchInput.addEventListener('input', function() {
                performSearch();
            });
            
            // Suoritetaan haku Enter-näppäimellä
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                    scrollToResults();
                }
            });
        }
        
        if (searchButton) {
            // Muutetaan hakupainikkeen teksti "Hae"-tekstiksi
            searchButton.innerHTML = '<i class="fas fa-search"></i> Hae';
            searchButton.style.width = 'auto';
            searchButton.style.padding = '0 20px';
            
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
                scrollToResults();
            });
        }
        
        // Filtterien tapahtumankäsittelijät
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                performSearch();
            });
        }
        
        if (pricingFilter) {
            pricingFilter.addEventListener('change', function() {
                performSearch();
            });
        }
        
        if (purposeFilter) {
            purposeFilter.addEventListener('change', function() {
                performSearch();
            });
        }
        
        // Tarkistetaan URL-parametrit sivun latautuessa
        checkUrlParams();
        
        // Dynaaminen filtterien päivitys
        function updateFilters() {
            // Kerätään kaikki uniikit kategoriat, hinnoittelut ja käyttötarkoitukset
            const categories = new Set();
            const pricings = new Set();
            const purposes = new Set();
            
            // Lisätään oletusarvot
            categories.add('all');
            pricings.add('all');
            purposes.add('all');
            
            // Käydään läpi kaikki työkalukortit
            document.querySelectorAll('.tool-card').forEach(card => {
                // Lisätään kategoria, jos se on määritelty
                if (card.dataset.category) {
                    categories.add(card.dataset.category);
                }
                
                // Lisätään hinnoittelu, jos se on määritelty
                if (card.dataset.pricing) {
                    pricings.add(card.dataset.pricing);
                }
                
                // Lisätään käyttötarkoitukset, jos ne on määritelty
                if (card.dataset.purpose) {
                    card.dataset.purpose.split(',').forEach(purpose => {
                        purposes.add(purpose.trim());
                    });
                }
            });
            
            // Päivitetään kategoria-filtteri
            if (categoryFilter) {
                // Tallennetaan nykyinen valinta
                const currentCategory = categoryFilter.value;
                
                // Tyhjennetään filtteri
                categoryFilter.innerHTML = '';
                
                // Lisätään "Kaikki kategoriat" -vaihtoehto
                const allCategoriesOption = document.createElement('option');
                allCategoriesOption.value = 'all';
                allCategoriesOption.textContent = 'Kaikki kategoriat';
                categoryFilter.appendChild(allCategoriesOption);
                
                // Lisätään muut kategoriat
                const categoryMap = {
                    'keskustelurobotit': 'Keskustelurobotit',
                    'kuvanluonti': 'Kuvanluonti',
                    'videogenerointi': 'Videogenerointi',
                    'aani': 'Ääni ja puhe',
                    'tuottavuus': 'Tuottavuus',
                    'tiedonhaku': 'Tiedonhaku',
                    'luovat': 'Luovat työkalut',
                    'yleiset': 'Yleiset AI-mallit',
                    'agentit': 'AI Agentit'
                };
                
                // Lisätään kategoriat aakkosjärjestyksessä
                Array.from(categories)
                    .filter(category => category !== 'all')
                    .sort((a, b) => {
                        const nameA = categoryMap[a] || a;
                        const nameB = categoryMap[b] || b;
                        return nameA.localeCompare(nameB);
                    })
                    .forEach(category => {
                        const option = document.createElement('option');
                        option.value = category;
                        option.textContent = categoryMap[category] || category;
                        categoryFilter.appendChild(option);
                    });
                
                // Palautetaan aiempi valinta, jos se on edelleen saatavilla
                if (Array.from(categories).includes(currentCategory)) {
                    categoryFilter.value = currentCategory;
                }
            }
            
            // Päivitetään hinnoittelu-filtteri
            if (pricingFilter) {
                // Tallennetaan nykyinen valinta
                const currentPricing = pricingFilter.value;
                
                // Tyhjennetään filtteri
                pricingFilter.innerHTML = '';
                
                // Lisätään "Kaikki" -vaihtoehto
                const allPricingsOption = document.createElement('option');
                allPricingsOption.value = 'all';
                allPricingsOption.textContent = 'Kaikki';
                pricingFilter.appendChild(allPricingsOption);
                
                // Lisätään muut hinnoittelut
                const pricingMap = {
                    'ilmainen': 'Ilmainen',
                    'freemium': 'Freemium',
                    'maksullinen': 'Maksullinen'
                };
                
                // Lisätään hinnoittelut järjestyksessä
                const pricingOrder = ['ilmainen', 'freemium', 'maksullinen'];
                
                pricingOrder.forEach(pricing => {
                    if (pricings.has(pricing)) {
                        const option = document.createElement('option');
                        option.value = pricing;
                        option.textContent = pricingMap[pricing] || pricing;
                        pricingFilter.appendChild(option);
                    }
                });
                
                // Palautetaan aiempi valinta, jos se on edelleen saatavilla
                if (Array.from(pricings).includes(currentPricing)) {
                    pricingFilter.value = currentPricing;
                }
            }
            
            // Päivitetään käyttötarkoitus-filtteri
            if (purposeFilter) {
                // Tallennetaan nykyinen valinta
                const currentPurpose = purposeFilter.value;
                
                // Tyhjennetään filtteri
                purposeFilter.innerHTML = '';
                
                // Lisätään "Kaikki" -vaihtoehto
                const allPurposesOption = document.createElement('option');
                allPurposesOption.value = 'all';
                allPurposesOption.textContent = 'Kaikki';
                purposeFilter.appendChild(allPurposesOption);
                
                // Lisätään muut käyttötarkoitukset
                const purposeMap = {
                    'yritys': 'Yrityskäyttö',
                    'henkilokohtainen': 'Henkilökohtainen',
                    'luova': 'Luova työ',
                    'tutkimus': 'Tutkimus ja opiskelu'
                };
                
                // Lisätään käyttötarkoitukset aakkosjärjestyksessä
                Array.from(purposes)
                    .filter(purpose => purpose !== 'all')
                    .sort((a, b) => {
                        const nameA = purposeMap[a] || a;
                        const nameB = purposeMap[b] || b;
                        return nameA.localeCompare(nameB);
                    })
                    .forEach(purpose => {
                        const option = document.createElement('option');
                        option.value = purpose;
                        option.textContent = purposeMap[purpose] || purpose;
                        purposeFilter.appendChild(option);
                    });
                
                // Palautetaan aiempi valinta, jos se on edelleen saatavilla
                if (Array.from(purposes).includes(currentPurpose)) {
                    purposeFilter.value = currentPurpose;
                }
            }
        }
        
        // Päivitetään filtterit sivun latautuessa
        updateFilters();
    }
});

// Lisätään tyylit hakutuloksille
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('tyokalut.html')) {
        const style = document.createElement('style');
        style.textContent = `
            .search-results-container {
                margin: 2rem 0;
                padding: 2rem 0;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding: 0 1rem;
            }
            
            .results-header h2 {
                margin: 0;
                font-size: 1.8rem;
                color: var(--text-light);
            }
            
            .no-results {
                display: none;
                text-align: center;
                padding: 2rem;
                background-color: var(--dark-surface);
                border-radius: 10px;
                margin: 2rem 0;
                color: var(--text-light);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .results-count {
                color: var(--text-light);
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            .search-highlight {
                background-color: rgba(0, 230, 184, 0.2);
                color: var(--accent-color);
                padding: 0 2px;
                border-radius: 3px;
                font-weight: bold;
            }
            
            .btn-small {
                font-size: 0.9rem;
                padding: 0.5rem 1rem;
                margin-top: 1rem;
                background-color: var(--dark-surface-lighter);
            }
        `;
        document.head.appendChild(style);
    }
});

// ... existing code ... 