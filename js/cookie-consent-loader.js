// Cookie Consent Loader for AI Patrik
// This script ensures the cookie consent banner is loaded correctly on all pages

(function() {
    console.log("Cookie consent loader executing");
    
    // Determine the correct base path based on the current URL path
    const path = window.location.pathname;
    let basePath = '';
    
    // Check if we're using file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    
    if (isFileProtocol) {
        // For file:// protocol, we need a different approach
        // Extract the base directory from the current URL
        const currentUrl = window.location.href;
        const lastSlashIndex = currentUrl.lastIndexOf('/');
        basePath = currentUrl.substring(0, lastSlashIndex + 1);
        
        // Go up to the root directory of the project
        const pathSegments = path.split('/').filter(part => part.length > 0);
        // Remove the file name
        const dirSegments = pathSegments.slice(0, pathSegments.length - 1);
        
        // Go up the directory structure to find the root
        basePath = basePath.split('/').slice(0, -dirSegments.length).join('/') + '/';
        
        console.log("File protocol detected, base path calculated:", basePath);
    } else {
        // Count directory levels to determine how many "../" we need
        const pathParts = path.split('/').filter(part => part.length > 0);
        console.log("Path parts:", pathParts);
        
        // If we're in a subdirectory, calculate the correct path
        if (pathParts.length > 0) {
            // For each directory level, we need to go up one level
            basePath = '../'.repeat(pathParts.length);
        }
        console.log("Base path calculated:", basePath);
    }
    
    // Load the CSS file if not already loaded
    if (!document.querySelector('link[href*="cookie-consent.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        
        if (isFileProtocol) {
            // For file protocol, use the calculated base path
            const rootPath = window.location.href.split('/pages/')[0];
            cssLink.href = rootPath + '/css/cookie-consent.css';
        } else {
            cssLink.href = basePath + 'css/cookie-consent.css';
        }
        
        document.head.appendChild(cssLink);
        console.log("Cookie consent CSS loaded from:", cssLink.href);
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
    
    // Use either method to determine if we're in production
    const isProduction = isProductionByDomain || isProductionAlternative;
    
    console.log("Is production by domain check:", isProductionByDomain);
    console.log("Is production by alternative check:", isProductionAlternative);
    console.log("Final production environment determination:", isProduction);
    
    // For testing in production, we can force the banner to show
    // by adding a URL parameter: ?force_cookie_banner=true
    const urlParams = new URLSearchParams(window.location.search);
    const forceBanner = urlParams.get('force_cookie_banner') === 'true';
    
    // Function to create the banner directly if needed
    function createBannerDirectly() {
        console.log("Creating banner directly");
        
        // In production with force parameter, we'll show the banner regardless of localStorage
        if (forceBanner) {
            console.log("Force banner parameter detected, showing banner regardless of localStorage");
            // Clear localStorage for testing
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieReject');
        }
        
        // Check localStorage values for debugging
        console.log("Current localStorage values:");
        console.log("cookieConsent:", localStorage.getItem('cookieConsent'));
        console.log("cookieReject:", localStorage.getItem('cookieReject'));
        console.log("Banner already exists:", !!document.querySelector('.cookie-consent'));
        
        if (!localStorage.getItem('cookieConsent') && !localStorage.getItem('cookieReject') && !document.querySelector('.cookie-consent')) {
            console.log("Conditions met, creating banner");
            
            // Create the banner element
            const banner = document.createElement('div');
            banner.className = 'cookie-consent';
            banner.style.position = 'fixed';
            banner.style.bottom = '-100px';
            banner.style.left = '0';
            banner.style.right = '0';
            banner.style.background = 'linear-gradient(135deg, rgba(0, 30, 60, 0.95), rgba(0, 60, 120, 0.95))';
            banner.style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.4)';
            banner.style.zIndex = '1000';
            banner.style.padding = '0';
            banner.style.transition = 'transform 0.5s ease, opacity 0.5s ease, bottom 0.5s ease';
            banner.style.opacity = '0';
            banner.style.borderTop = '2px solid #00ccaa';
            
            // Create the content
            banner.innerHTML = `
                <div class="cookie-content" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; position: relative;">
                    <div class="cookie-text" style="flex: 1; min-width: 300px; margin-right: 2rem;">
                        <h3 style="color: #00ccaa; margin-bottom: 0.5rem; font-size: 1.2rem; text-shadow: 0 2px 10px rgba(0, 200, 255, 0.3);"><i class="fas fa-cookie-bite"></i> Evästeiden käyttö</h3>
                        <p style="color: white; margin: 0; font-size: 0.95rem; line-height: 1.5;">Käytämme evästeitä parantaaksemme sivuston käyttökokemusta ja analysoidaksemme liikennettä. 
                        Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.</p>
                    </div>
                    <div class="cookie-buttons" style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem; flex-wrap: wrap;">
                        <button class="cookie-accept" style="background: linear-gradient(135deg, #00ccaa, #0066cc); color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0, 100, 255, 0.4); white-space: nowrap; min-width: 120px; text-align: center;">Hyväksyn</button>
                        <button class="cookie-reject" style="background: rgba(255, 255, 255, 0.05); color: white; border: 1px solid rgba(255, 255, 255, 0.15); padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; white-space: nowrap; min-width: 120px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">Kieltäydyn</button>
                        <button class="btn-secondary cookie-more-info" style="background: rgba(255, 255, 255, 0.08); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.6rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; white-space: nowrap; min-width: 120px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">Lisätietoja</button>
                    </div>
                </div>
            `;
            
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
                // Save consent to localStorage
                localStorage.setItem('cookieConsent', 'true');
                localStorage.setItem('cookieConsentDate', new Date().toISOString());
                
                // Hide banner
                banner.style.bottom = '-100px';
                banner.style.opacity = '0';
                setTimeout(() => {
                    if (banner && banner.parentNode) {
                        banner.parentNode.removeChild(banner);
                    }
                }, 500);
                
                // Load Google Analytics
                (function() {
                    var ga = document.createElement('script');
                    ga.type = 'text/javascript';
                    ga.async = true;
                    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-9QDDPLJZ9P';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(ga, s);
                    
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-9QDDPLJZ9P');
                })();
                
                // Show thank you message
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.background = 'linear-gradient(135deg, #00ccaa, #0066cc)';
                notification.style.color = 'white';
                notification.style.padding = '15px 20px';
                notification.style.borderRadius = '10px';
                notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                notification.style.zIndex = '1000';
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                notification.style.transition = 'all 0.3s ease';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Kiitos! Evästeasetukset tallennettu.';
                
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
            });
            
            rejectButton.addEventListener('click', function() {
                console.log("Reject button clicked");
                // Save rejection to localStorage
                localStorage.setItem('cookieReject', 'true');
                localStorage.setItem('cookieRejectDate', new Date().toISOString());
                
                // Hide banner
                banner.style.bottom = '-100px';
                banner.style.opacity = '0';
                setTimeout(() => {
                    if (banner && banner.parentNode) {
                        banner.parentNode.removeChild(banner);
                    }
                }, 500);
                
                // Show notification
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.background = 'linear-gradient(135deg, #555555, #333333)';
                notification.style.color = 'white';
                notification.style.padding = '15px 20px';
                notification.style.borderRadius = '10px';
                notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                notification.style.zIndex = '1000';
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                notification.style.transition = 'all 0.3s ease';
                notification.innerHTML = '<i class="fas fa-ban"></i> Evästeet on estetty. Jotkin toiminnot saattavat olla rajoitettuja.';
                
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
            });
            
            moreInfoButton.addEventListener('click', function() {
                console.log("More info button clicked");
                
                // Get the current URL for debugging
                const currentUrl = window.location.href;
                console.log("Current URL:", currentUrl);
                
                // Check if we're in a local environment
                const isLocalEnvironment = window.location.hostname === 'localhost' || 
                                          window.location.hostname === '127.0.0.1' || 
                                          window.location.protocol === 'file:';
                
                console.log("Is local environment:", isLocalEnvironment);
                
                // Determine the correct path to the privacy policy page
                let privacyPolicyPath;
                
                // For file:// protocol, we need to use absolute paths
                if (window.location.protocol === 'file:') {
                    console.log("Using file:// protocol");
                    
                    // Extract the root path of the project
                    const rootPath = currentUrl.split('/pages/')[0];
                    console.log("Root path:", rootPath);
                    
                    // Create absolute path to the privacy policy
                    privacyPolicyPath = rootPath + '/pages/tietosuojakaytanto.html';
                    console.log("Using absolute file path for file protocol");
                } 
                // For http/https in local environment
                else if (isLocalEnvironment) {
                    // Get the base URL (protocol + hostname + port)
                    const baseUrl = window.location.protocol + '//' + window.location.host;
                    console.log("Base URL:", baseUrl);
                    
                    // Always use absolute path in local environment
                    privacyPolicyPath = baseUrl + '/pages/tietosuojakaytanto.html';
                    console.log("Using absolute path in local environment");
                } 
                // Production environment
                else {
                    // Determine the correct path based on the current location
                    if (path.includes('/pages/oppaat/') || 
                        path.includes('/pages/arvostelut/') || 
                        path.includes('/pages/blogi/')) {
                        // We're in a deeper subdirectory (two levels deep)
                        privacyPolicyPath = '../../tietosuojakaytanto.html';
                        console.log("Deep subdirectory detected in production, using relative path: ../../tietosuojakaytanto.html");
                    } else if (path.includes('/pages/')) {
                        // We're directly in the pages directory (one level deep)
                        privacyPolicyPath = 'tietosuojakaytanto.html';
                        console.log("Pages directory detected in production, using relative path: tietosuojakaytanto.html");
                    } else {
                        // We're at the root
                        privacyPolicyPath = 'pages/tietosuojakaytanto.html';
                        console.log("Root directory detected in production, using path: pages/tietosuojakaytanto.html");
                    }
                }
                
                console.log("Final privacy policy path:", privacyPolicyPath);
                
                // Open the privacy policy page in a new tab
                window.open(privacyPolicyPath, '_blank');
            });
        } else {
            console.log("Banner not created: cookieConsent exists, cookieReject exists, or banner already present");
            console.log("cookieConsent:", localStorage.getItem('cookieConsent'));
            console.log("cookieReject:", localStorage.getItem('cookieReject'));
            console.log("banner exists:", !!document.querySelector('.cookie-consent'));
        }
    }
    
    // Ensure the banner is created when the page is loaded
    console.log("Current document.readyState:", document.readyState);
    console.log("Is production environment:", isProduction);
    console.log("Force banner parameter:", forceBanner);
    
    // Always create the banner after a short delay, regardless of document state
    setTimeout(function() {
        console.log("Executing delayed banner creation");
        createBannerDirectly();
    }, 500);
    
    // Also try with window.onload as a fallback
    window.addEventListener('load', function() {
        console.log("Window load event fired");
        setTimeout(createBannerDirectly, 100);
    });
    
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
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.protocol === 'file:' ||
        forceBanner) {
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
    }
})(); 