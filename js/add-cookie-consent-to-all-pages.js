// Script to add cookie consent to all pages

// Function to add cookie consent to all pages
function addCookieConsentToAllPages() {
    // Get all HTML files in the root directory and pages directory
    const rootHtmlFiles = document.querySelectorAll('a[href$=".html"]');
    const pagesHtmlFiles = document.querySelectorAll('a[href^="pages/"]');
    
    // Combine all HTML files
    const allHtmlFiles = [...rootHtmlFiles, ...pagesHtmlFiles];
    
    // Create a Set to store unique file paths
    const uniqueFilePaths = new Set();
    
    // Add each file path to the Set
    allHtmlFiles.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#') && !href.includes('?')) {
            uniqueFilePaths.add(href);
        }
    });
    
    // Log the files that will be modified
    console.log('Files to be modified:', Array.from(uniqueFilePaths));
    
    // For each file, add the cookie consent script
    uniqueFilePaths.forEach(filePath => {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                // Create a DOM parser
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Check if the cookie consent script is already included
                const hasScript = Array.from(doc.querySelectorAll('script')).some(script => {
                    return script.src && (script.src.includes('cookie-consent.js') || script.src.includes('cookie-consent-loader.js'));
                });
                
                if (!hasScript) {
                    // Add the cookie consent loader script
                    const script = document.createElement('script');
                    
                    // Determine the correct path based on the file location
                    if (filePath.startsWith('pages/')) {
                        script.src = '../js/cookie-consent-loader.js';
                    } else {
                        script.src = 'js/cookie-consent-loader.js';
                    }
                    
                    // Add the script to the document
                    doc.body.appendChild(script);
                    
                    // Convert the document back to HTML
                    const modifiedHtml = doc.documentElement.outerHTML;
                    
                    // Save the modified HTML back to the file
                    // Note: This would require server-side code to actually save the file
                    console.log(`Added cookie consent to ${filePath}`);
                }
            })
            .catch(error => {
                console.error(`Error processing ${filePath}:`, error);
            });
    });
}

// This script is for demonstration purposes only
// In a real-world scenario, you would need server-side code to modify the files
console.log('To add cookie consent to all pages, you need to manually add the script tag to each HTML file.');
console.log('Add this before the closing </body> tag:');
console.log('For root pages: <script src="js/cookie-consent-loader.js"></script>');
console.log('For pages in the pages directory: <script src="../js/cookie-consent-loader.js"></script>'); 