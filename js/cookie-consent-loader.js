// Cookie Consent Loader for AI Patrik
// This script ensures the cookie consent banner is loaded correctly on all pages

(function() {
    console.log("=== Cookie Consent Loader Debug ===");
    console.log("Script started executing");
    
    // Function to initialize cookie consent
    function initializeCookieConsent() {
        try {
            console.log("Initializing cookie consent");
            console.log("Current URL:", window.location.href);
            console.log("Current hostname:", window.location.hostname);
            console.log("Current protocol:", window.location.protocol);
            console.log("Document ready state:", document.readyState);
            console.log("Body exists:", !!document.body);
            console.log("Head exists:", !!document.head);
            
            // CRITICAL FIX: Check if we're in an iframe - if so, don't show the banner
            if (window !== window.top) {
                console.log("In iframe, not showing cookie banner");
                return;
            }
            
            // Determine the correct base path based on the current URL path
            const path = window.location.pathname;
            let basePath = '';
            
            // Debug path information
            console.log("=== Path Resolution Debug ===");
            console.log("Full pathname:", path);
            console.log("Current URL:", window.location.href);
            console.log("Protocol:", window.location.protocol);
            console.log("Hostname:", window.location.hostname);
            
            // Check if we're using file:// protocol
            const isFileProtocol = window.location.protocol === 'file:';
            
            if (isFileProtocol) {
                // For file:// protocol, we need a different approach
                const currentUrl = window.location.href;
                const lastSlashIndex = currentUrl.lastIndexOf('/');
                basePath = currentUrl.substring(0, lastSlashIndex + 1);
                
                // Go up to the root directory of the project
                const pathSegments = path.split('/').filter(part => part.length > 0);
                const dirSegments = pathSegments.slice(0, pathSegments.length - 1);
                basePath = basePath.split('/').slice(0, -dirSegments.length).join('/') + '/';
                
                console.log("File protocol detected, base path calculated:", basePath);
            } else {
                // For web protocol (http/https)
                const pathParts = path.split('/').filter(part => part.length > 0);
                console.log("Path parts:", pathParts);
                
                // If we're in a subdirectory, calculate the correct path
                if (pathParts.length > 0) {
                    // For each directory level, we need to go up one level
                    basePath = '../'.repeat(pathParts.length);
                }
                
                // CRITICAL FIX: If we're at the root, use absolute path
                if (basePath === '') {
                    basePath = '/';
                }
                
                console.log("Base path calculated:", basePath);
            }
            
            // Load the CSS file if not already loaded
            if (!document.querySelector('link[href*="cookie-consent.css"]')) {
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                
                // Try multiple possible paths for the CSS file
                const possiblePaths = [
                    '/css/cookie-consent.css',
                    '../css/cookie-consent.css',
                    '../../css/cookie-consent.css',
                    basePath + 'css/cookie-consent.css',
                    // Add absolute paths for production
                    window.location.origin + '/css/cookie-consent.css',
                    window.location.origin + basePath + 'css/cookie-consent.css'
                ];
                
                console.log("Attempting to load CSS from paths:", possiblePaths);
                
                // Try each path until one works
                for (const path of possiblePaths) {
                    try {
                        cssLink.href = path;
                        document.head.appendChild(cssLink);
                        console.log("Cookie consent CSS loaded successfully from:", path);
                        break;
                    } catch (error) {
                        console.log("Failed to load CSS from:", path, error);
                        continue;
                    }
                }
            } else {
                console.log("Cookie consent CSS already loaded");
            }
            
            // Debug current hostname
            console.log("Current hostname:", window.location.hostname);
            console.log("Current protocol:", window.location.protocol);
            console.log("Current URL:", window.location.href);
            
            // Check if we're in production environment - multiple ways to detect
            const isProductionByDomain = window.location.hostname.includes('aipatrik.com') || 
                                        window.location.hostname.includes('www.aipatrik.com');
            
            // Alternative check - if not localhost and not file protocol, assume production
            const isProductionAlternative = window.location.hostname !== 'localhost' && 
                                           window.location.hostname !== '127.0.0.1' && 
                                           window.location.protocol !== 'file:';
            
            // Additional check for production - check if we're on a real domain
            const isProductionByDomainCheck = window.location.hostname.includes('.') && 
                                             !window.location.hostname.includes('localhost') &&
                                             !window.location.hostname.includes('127.0.0.1');
            
            // Use multiple methods to determine if we're in production
            const isProduction = isProductionByDomain || isProductionAlternative || isProductionByDomainCheck;
            
            console.log("=== Production Environment Debug ===");
            console.log("Is production by domain check:", isProductionByDomain);
            console.log("Is production by alternative check:", isProductionAlternative);
            console.log("Is production by domain check:", isProductionByDomainCheck);
            console.log("Final production environment determination:", isProduction);
            console.log("Current hostname:", window.location.hostname);
            console.log("Current protocol:", window.location.protocol);
            
            // For testing in production, we can force the banner to show
            // by adding a URL parameter: ?force_cookie_banner=true
            const urlParams = new URLSearchParams(window.location.search);
            const forceBanner = urlParams.get('force_cookie_banner') === 'true';
            
            // Debug force parameter and environment
            console.log("Force banner parameter:", forceBanner);
            console.log("Current environment:", {
                hostname: window.location.hostname,
                protocol: window.location.protocol,
                pathname: window.location.pathname,
                search: window.location.search
            });
            
            // If force parameter is true, clear any existing consent
            if (forceBanner && localStorageAvailable) {
                console.log("Force banner parameter detected, clearing existing consent");
                localStorage.removeItem('cookieConsent');
                localStorage.removeItem('cookieReject');
            }
            
            // GOOGLE TAG MANAGER FIX: Check if Google Tag is already loaded
            const isGoogleTagLoaded = typeof gtag === 'function';
            console.log("Is Google Tag already loaded:", isGoogleTagLoaded);
            
            // GOOGLE TAG MANAGER FIX: Check if Google Tag Manager script is already in the DOM
            const isGoogleTagScriptLoaded = !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
            console.log("Is Google Tag script already in DOM:", isGoogleTagScriptLoaded);
            
            // CRITICAL FIX: Check if localStorage is available
            let localStorageAvailable = false;
            try {
                const test = 'test';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                localStorageAvailable = true;
            } catch (e) {
                console.error("localStorage not available:", e);
            }
            console.log("localStorage available:", localStorageAvailable);
            
            // GOOGLE TAG MANAGER FIX: Function to properly load Google Analytics
            function loadGoogleAnalytics() {
                // Check if Google Analytics is already loaded
                if (isGoogleTagLoaded && isGoogleTagScriptLoaded) {
                    console.log("Google Analytics already loaded, not loading again");
                    return;
                }
                
                console.log("Loading Google Analytics");
                
                // Initialize dataLayer if not already initialized
                window.dataLayer = window.dataLayer || [];
                
                // Define gtag function if not already defined
                if (typeof gtag !== 'function') {
                    window.gtag = function() {
                        dataLayer.push(arguments);
                    };
                }
                
                // Load the Google Analytics script if not already loaded
                if (!isGoogleTagScriptLoaded) {
                    const ga = document.createElement('script');
                    ga.type = 'text/javascript';
                    ga.async = true;
                    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-9QDDPLJZ9P';
                    const s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(ga, s);
                    console.log("Google Analytics script added to DOM");
                }
                
                // Configure Google Analytics
                gtag('js', new Date());
                gtag('config', 'G-9QDDPLJZ9P');
                console.log("Google Analytics configured");
            }
            
            // Function to create the banner directly if needed
            function createBannerDirectly() {
                console.log("=== Banner Creation Debug ===");
                console.log("Creating banner directly");
                
                // In production with force parameter, we'll show the banner regardless of localStorage
                if (forceBanner && localStorageAvailable) {
                    console.log("Force banner parameter detected, showing banner regardless of localStorage");
                    // Clear localStorage for testing
                    localStorage.removeItem('cookieConsent');
                    localStorage.removeItem('cookieReject');
                }
                
                // Check localStorage values for debugging
                if (localStorageAvailable) {
                    console.log("Current localStorage values:");
                    console.log("cookieConsent:", localStorage.getItem('cookieConsent'));
                    console.log("cookieReject:", localStorage.getItem('cookieReject'));
                }
                
                // Check if banner already exists
                const existingBanner = document.querySelector('.cookie-consent');
                console.log("Banner already exists:", !!existingBanner);
                if (existingBanner) {
                    console.log("Existing banner found, removing it first");
                    existingBanner.remove();
                }
                
                // GOOGLE TAG MANAGER FIX: Check if consent was already given and Google Analytics needs to be loaded
                if (localStorageAvailable && localStorage.getItem('cookieConsent') === 'true' && !isGoogleTagLoaded) {
                    console.log("Consent already given but Google Analytics not loaded, loading now");
                    loadGoogleAnalytics();
                }
                
                // Check if we should show the banner
                const shouldShowBanner = 
                    (!localStorageAvailable || 
                     (!localStorage.getItem('cookieConsent') && !localStorage.getItem('cookieReject')) ||
                     forceBanner);
                
                console.log("Should show banner:", shouldShowBanner);
                console.log("localStorage available:", localStorageAvailable);
                console.log("cookieConsent:", localStorageAvailable ? localStorage.getItem('cookieConsent') : 'N/A');
                console.log("cookieReject:", localStorageAvailable ? localStorage.getItem('cookieReject') : 'N/A');
                console.log("forceBanner:", forceBanner);
                
                if (shouldShowBanner) {
                    console.log("Conditions met, creating banner");
                    
                    // Create the banner element with inline styles for reliability
                    const banner = document.createElement('div');
                    banner.className = 'cookie-consent';
                    banner.style.cssText = `
                        position: fixed;
                        bottom: -100px;
                        left: 0;
                        right: 0;
                        background: linear-gradient(135deg, rgba(0, 30, 60, 0.95), rgba(0, 60, 120, 0.95));
                        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
                        z-index: 9999;
                        padding: 0;
                        transition: transform 0.5s ease, opacity 0.5s ease, bottom 0.5s ease;
                        opacity: 0;
                        border-top: 2px solid #00ccaa;
                    `;
                    
                    // Create the content with inline styles
                    banner.innerHTML = `
                        <div style="max-width: 1200px; margin: 0 auto; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; position: relative;">
                            <div style="flex: 1; min-width: 300px; margin-right: 2rem;">
                                <h3 style="color: #00ccaa; margin-bottom: 0.5rem; font-size: 1.2rem; text-shadow: 0 2px 10px rgba(0, 200, 255, 0.3);"><i class="fas fa-cookie-bite"></i> Evästeiden käyttö</h3>
                                <p style="color: white; margin: 0; font-size: 0.95rem; line-height: 1.5;">Käytämme evästeitä parantaaksemme sivuston käyttökokemusta ja analysoidaksemme liikennettä. 
                                Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.</p>
                            </div>
                            <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem; flex-wrap: wrap;">
                                <button class="cookie-accept" style="background: linear-gradient(135deg, #00ccaa, #0066cc); color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0, 100, 255, 0.4); white-space: nowrap; min-width: 120px; text-align: center;">Hyväksyn</button>
                                <button class="cookie-reject" style="background: rgba(255, 255, 255, 0.05); color: white; border: 1px solid rgba(255, 255, 255, 0.15); padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; white-space: nowrap; min-width: 120px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">Vain välttämättömät</button>
                                <button class="btn-secondary cookie-more-info" style="background: rgba(255, 255, 255, 0.08); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; white-space: nowrap; min-width: 120px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">Lisätietoja</button>
                            </div>
                        </div>
                    `;
                    
                    try {
                        // CRITICAL FIX: Check if body exists before appending
                        if (!document.body) {
                            console.error("Document body not available yet");
                            return false;
                        }
                        
                        // Add the banner to the body
                        document.body.appendChild(banner);
                        console.log("Banner added to body");
                        
                        // Add animation class after a small delay to trigger animation
                        setTimeout(() => {
                            banner.style.bottom = '0';
                            banner.style.opacity = '1';
                            console.log("Banner made visible");
                        }, 100);
                        
                        // Add event listeners to buttons
                        const acceptButton = banner.querySelector('.cookie-accept');
                        const rejectButton = banner.querySelector('.cookie-reject');
                        const moreInfoButton = banner.querySelector('.cookie-more-info');
                        
                        acceptButton.addEventListener('click', function() {
                            console.log("Accept button clicked");
                            // Save consent to localStorage if available
                            if (localStorageAvailable) {
                                localStorage.setItem('cookieConsent', 'true');
                                localStorage.setItem('cookieConsentDate', new Date().toISOString());
                            }
                            
                            // Hide banner
                            banner.style.bottom = '-100px';
                            banner.style.opacity = '0';
                            setTimeout(() => {
                                if (banner && banner.parentNode) {
                                    banner.parentNode.removeChild(banner);
                                }
                            }, 500);
                            
                            // GOOGLE TAG MANAGER FIX: Use the centralized function to load Google Analytics
                            loadGoogleAnalytics();
                            
                            // Show thank you message
                            showNotification('Kiitos! Evästeasetukset tallennettu.', 'success');
                            
                            // GOOGLE TAG MANAGER FIX: Only reload if Google Analytics wasn't already loaded
                            if (!isGoogleTagLoaded) {
                                // Reload the page to apply Google Analytics
                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            }
                        });
                        
                        rejectButton.addEventListener('click', function() {
                            console.log("Reject button clicked");
                            // Save rejection to localStorage if available
                            if (localStorageAvailable) {
                                localStorage.setItem('cookieReject', 'true');
                                localStorage.setItem('cookieRejectDate', new Date().toISOString());
                            }
                            
                            // Hide banner
                            banner.style.bottom = '-100px';
                            banner.style.opacity = '0';
                            setTimeout(() => {
                                if (banner && banner.parentNode) {
                                    banner.parentNode.removeChild(banner);
                                }
                            }, 500);
                            
                            // Show notification
                            showNotification('Vain välttämättömät evästeet käytössä. Jotkin toiminnot saattavat olla rajoitettuja.', 'reject');
                        });
                        
                        moreInfoButton.addEventListener('click', function() {
                            console.log("More info button clicked");
                            const privacyPolicyPath = getPrivacyPolicyPath();
                            console.log("Opening privacy policy at:", privacyPolicyPath);
                            window.open(privacyPolicyPath, '_blank');
                        });
                        
                        return true;
                    } catch (error) {
                        console.error("Error creating banner:", error);
                        return false;
                    }
                } else {
                    console.log("Banner not created: conditions not met");
                    return false;
                }
            }
            
            // Helper function to show notifications
            function showNotification(message, type = 'success') {
                console.log("Showing notification:", message, "type:", type);
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: ${type === 'success' ? 'linear-gradient(135deg, #00ccaa, #0066cc)' : 'linear-gradient(135deg, #555555, #333333)'};
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    z-index: 9999;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                `;
                notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'ban'}"></i> ${message}`;
                
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

            // Helper function to get privacy policy path
            function getPrivacyPolicyPath() {
                const currentUrl = window.location.href;
                console.log("Current URL:", currentUrl);
                
                // Check if we're in a local environment
                const isLocalEnvironment = window.location.hostname === 'localhost' || 
                                      window.location.hostname === '127.0.0.1' || 
                                      window.location.protocol === 'file:';
                
                console.log("Is local environment:", isLocalEnvironment);
                
                // For file:// protocol, we need to use absolute paths
                if (window.location.protocol === 'file:') {
                    console.log("Using file:// protocol");
                    const rootPath = currentUrl.split('/pages/')[0];
                    console.log("Root path:", rootPath);
                    return rootPath + '/pages/tietosuojakaytanto.html';
                } 
                // For http/https in local environment or production
                else {
                    const baseUrl = window.location.protocol + '//' + window.location.host;
                    console.log("Base URL:", baseUrl);
                    return baseUrl + '/pages/tietosuojakaytanto.html';
                }
            }
            
            // Ensure the banner is created when the page is loaded
            console.log("Current document.readyState:", document.readyState);
            console.log("Is production environment:", isProduction);
            console.log("Force banner parameter:", forceBanner);
            
            // CRITICAL FIX: Create a direct banner creation function that doesn't rely on DOM ready
            function createBannerImmediately() {
                // If body is available, create banner immediately
                if (document.body) {
                    console.log("Body is available, creating banner immediately");
                    return createBannerDirectly();
                } else {
                    console.log("Body not available yet, will try again");
                    return false;
                }
            }
            
            // Varmistetaan, että DOM on valmis ennen palkin luomista
            function ensureDomReady(callback) {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', callback);
                    console.log("Waiting for DOMContentLoaded event");
                } else {
                    // DOM on jo valmis
                    callback();
                    console.log("DOM already ready, executing callback immediately");
                }
            }
            
            // CRITICAL FIX: Try to create banner immediately if possible
            let bannerCreated = createBannerImmediately();
            
            // If banner wasn't created immediately, use multiple approaches to ensure it gets created
            if (!bannerCreated) {
                // Käytetään useita eri tapoja varmistamaan, että palkki luodaan
                
                // 1. Varmistetaan, että DOM on valmis ja luodaan palkki
                ensureDomReady(function() {
                    console.log("DOM ready, creating banner with delay");
                    setTimeout(function() {
                        if (!bannerCreated) bannerCreated = createBannerDirectly();
                    }, 500); // Shorter delay (0.5s)
                });
                
                // 2. Luodaan palkki window.onload-tapahtumassa
                window.addEventListener('load', function() {
                    console.log("Window load event fired");
                    setTimeout(function() {
                        if (!bannerCreated) bannerCreated = createBannerDirectly();
                    }, 1000); // Shorter delay (1s)
                });
                
                // 3. Varmuuden vuoksi luodaan palkki myös viiveellä
                setTimeout(function() {
                    console.log("Executing delayed banner creation (1.5s delay)");
                    if (!bannerCreated) bannerCreated = createBannerDirectly();
                }, 1500); // Shorter delay (1.5s)
                
                // 4. Viimeinen yritys vielä pidemmällä viiveellä
                setTimeout(function() {
                    console.log("Final attempt to create banner (2s delay)");
                    if (!document.querySelector('.cookie-consent') && !bannerCreated) {
                        console.log("Banner still not created, making final attempt");
                        bannerCreated = createBannerDirectly();
                    } else {
                        console.log("Banner already exists, no need for final attempt");
                    }
                }, 2000); // Shorter delay (2s)
                
                // 5. Tarkistetaan vielä kerran pitkän viiveen jälkeen
                setTimeout(function() {
                    console.log("Final check after 3s delay");
                    if (!document.querySelector('.cookie-consent') && !bannerCreated) {
                        if (localStorageAvailable && !localStorage.getItem('cookieConsent') && !localStorage.getItem('cookieReject')) {
                            console.log("Banner still not created after 3s, making absolute final attempt");
                            
                            // Tarkistetaan, onko Google Tag mahdollisesti ladattu ilman suostumusta
                            if (typeof gtag === 'function' && !localStorage.getItem('cookieConsent')) {
                                console.log("WARNING: Google Tag is loaded without consent. This might be causing issues.");
                            }
                            
                            // CRITICAL FIX: Force banner creation with a direct approach
                            const banner = document.createElement('div');
                            banner.className = 'cookie-consent';
                            banner.style.position = 'fixed';
                            banner.style.bottom = '0';
                            banner.style.left = '0';
                            banner.style.right = '0';
                            banner.style.background = 'linear-gradient(135deg, rgba(0, 30, 60, 0.95), rgba(0, 60, 120, 0.95))';
                            banner.style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.4)';
                            banner.style.zIndex = '9999';
                            banner.style.padding = '20px';
                            banner.style.color = 'white';
                            banner.style.textAlign = 'center';
                            banner.style.borderTop = '2px solid #00ccaa';
                            banner.innerHTML = '<p>Käytämme evästeitä parantaaksemme sivuston käyttökokemusta. <button onclick="document.querySelector(\'.cookie-consent\').style.display=\'none\'; localStorage.setItem(\'cookieConsent\', \'true\'); window.location.reload();" style="background: #00ccaa; border: none; padding: 5px 10px; margin-left: 10px; cursor: pointer; border-radius: 5px;">Hyväksyn</button> <button onclick="document.querySelector(\'.cookie-consent\').style.display=\'none\'; localStorage.setItem(\'cookieReject\', \'true\');" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); padding: 5px 10px; margin-left: 10px; cursor: pointer; border-radius: 5px; color: white;">Vain välttämättömät</button></p>';
                            
                            if (document.body) {
                                document.body.appendChild(banner);
                                console.log("Emergency banner created");
                            } else {
                                console.error("Body still not available after 3s");
                            }
                        }
                    } else {
                        console.log("Banner exists or consent already given, no need for final check");
                    }
                }, 3000); // Shorter delay (3s)
            }
            
            // Load Font Awesome if not already loaded
            if (!document.querySelector('link[href*="font-awesome"]')) {
                const faLink = document.createElement('link');
                faLink.rel = 'stylesheet';
                faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
                document.head.appendChild(faLink);
                console.log("Font Awesome loaded");
            } else {
                console.log("Font Awesome already loaded");
            }
            
            // Add a reset button for testing (in development or when forced in production)
            if ((window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' || 
                window.location.protocol === 'file:' ||
                forceBanner) && localStorageAvailable) {
                
                // CRITICAL FIX: Ensure body exists before adding reset button
                function addResetButton() {
                    if (!document.body) {
                        setTimeout(addResetButton, 500);
                        return;
                    }
                    
                    const resetButton = document.createElement('button');
                    resetButton.textContent = 'Reset Cookie Consent';
                    resetButton.style.position = 'fixed';
                    resetButton.style.bottom = '10px';
                    resetButton.style.left = '10px';
                    resetButton.style.zIndex = '9999';
                    resetButton.style.padding = '5px 10px';
                    resetButton.style.background = '#333';
                    resetButton.style.color = 'white';
                    resetButton.style.border = 'none';
                    resetButton.style.borderRadius = '5px';
                    resetButton.style.cursor = 'pointer';
                    resetButton.style.fontSize = '12px';
                    
                    resetButton.addEventListener('click', function() {
                        localStorage.removeItem('cookieConsent');
                        localStorage.removeItem('cookieConsentDate');
                        localStorage.removeItem('cookieReject');
                        localStorage.removeItem('cookieRejectDate');
                        alert('Cookie consent reset. Refresh the page to see the banner again.');
                        location.reload(); // Reload the page to show the banner immediately
                    });
                    
                    document.body.appendChild(resetButton);
                    console.log("Reset button added");
                }
                
                addResetButton();
            }
        } catch (error) {
            console.error("Error in cookie consent initialization:", error);
        }
    }
    
    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCookieConsent);
    } else {
        initializeCookieConsent();
    }
})(); 