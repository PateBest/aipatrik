// AI Patrik - Client-side API adapter

/**
 * API-client toiminnallisuus sisällön hallintaan
 * Tämä tiedosto sisältää funktiot, joilla voidaan kommunikoida palvelinpuolen kanssa
 */

// Globaalit muuttujat
const API_VERSION = '1.0.0';
const API_BASE_URL = 'http://localhost:3000/api';
const DEBUG = true;

// Apufunktio lokitukseen
function log(message, type = 'info') {
    if (!DEBUG) return;
    
    switch (type) {
        case 'error':
            console.error(`[AI Patrik API Client] ${message}`);
            break;
        case 'warning':
            console.warn(`[AI Patrik API Client] ${message}`);
            break;
        default:
            console.log(`[AI Patrik API Client] ${message}`);
    }
}

// Apufunktio autentikaation lisäämiseen
function getAuthHeaders() {
    const username = 'ai_agentti';
    const password = 'aipatrik2025';
    const base64Credentials = btoa(`${username}:${password}`);
    
    return {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
    };
}

// Funktio blogitekstin luomiseen
async function createBlogPost(blog) {
    log(`Luodaan blogiteksti: ${blog.title} (${blog.slug}.html)`);
    
    try {
        // Generoidaan HTML-sisältö
        const htmlContent = window.aiPatrikAPI.generateHtmlTemplate('blog', blog);
        
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/blog`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...blog,
                htmlContent
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Virhe blogitekstin luomisessa');
        }
        
        log(`Blogiteksti luotu onnistuneesti: ${blog.slug}.html`);
        return data;
    } catch (error) {
        log(`Virhe blogitekstin luomisessa: ${error.message}`, 'error');
        
        // Jos palvelinyhteys epäonnistuu, käytetään client-side fallbackia
        log('Käytetään client-side fallbackia', 'warning');
        return window.aiPatrikAPI.createBlogPost(blog);
    }
}

// Funktio arvostelun luomiseen
async function createReview(review) {
    log(`Luodaan arvostelu: ${review.title} (${review.slug}.html)`);
    
    try {
        // Generoidaan HTML-sisältö
        const htmlContent = window.aiPatrikAPI.generateHtmlTemplate('review', review);
        
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/review`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...review,
                htmlContent
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Virhe arvostelun luomisessa');
        }
        
        log(`Arvostelu luotu onnistuneesti: ${review.slug}.html`);
        return data;
    } catch (error) {
        log(`Virhe arvostelun luomisessa: ${error.message}`, 'error');
        
        // Jos palvelinyhteys epäonnistuu, käytetään client-side fallbackia
        log('Käytetään client-side fallbackia', 'warning');
        return window.aiPatrikAPI.createReview(review);
    }
}

// Funktio oppaan luomiseen
async function createGuide(guide) {
    log(`Luodaan opas: ${guide.title} (${guide.slug}.html)`);
    
    try {
        // Generoidaan HTML-sisältö
        const htmlContent = window.aiPatrikAPI.generateHtmlTemplate('guide', guide);
        
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/guide`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...guide,
                htmlContent
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Virhe oppaan luomisessa');
        }
        
        log(`Opas luotu onnistuneesti: ${guide.slug}.html`);
        return data;
    } catch (error) {
        log(`Virhe oppaan luomisessa: ${error.message}`, 'error');
        
        // Jos palvelinyhteys epäonnistuu, käytetään client-side fallbackia
        log('Käytetään client-side fallbackia', 'warning');
        return window.aiPatrikAPI.createGuide(guide);
    }
}

// Funktio työkalun luomiseen
async function createTool(tool) {
    log(`Luodaan työkalu: ${tool.title} (${tool.slug}.html)`);
    
    try {
        // Generoidaan HTML-sisältö
        const htmlContent = window.aiPatrikAPI.generateToolHtmlTemplate(tool);
        
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/tool`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...tool,
                htmlContent
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Virhe työkalun luomisessa');
        }
        
        log(`Työkalu luotu onnistuneesti: ${tool.slug}.html`);
        return data;
    } catch (error) {
        log(`Virhe työkalun luomisessa: ${error.message}`, 'error');
        
        // Jos palvelinyhteys epäonnistuu, käytetään client-side fallbackia
        log('Käytetään client-side fallbackia', 'warning');
        return window.aiPatrikAPI.createTool(tool);
    }
}

// Funktio sisällön poistamiseen
async function deleteContent(type, slug) {
    log(`Poistetaan sisältö: ${type}/${slug}.html`);
    
    try {
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/${type}/${slug}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `Virhe sisällön poistamisessa: ${type}/${slug}`);
        }
        
        log(`Sisältö poistettu onnistuneesti: ${type}/${slug}.html`);
        return data;
    } catch (error) {
        log(`Virhe sisällön poistamisessa: ${error.message}`, 'error');
        return { success: false, error: error.message };
    }
}

// Funktio kuvan lataamiseen
async function uploadImage(type, file) {
    log(`Ladataan kuva: ${file.name}`);
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        // Lähetetään pyyntö palvelimelle
        const response = await fetch(`${API_BASE_URL}/upload/${type}`, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeaders().Authorization
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Virhe kuvan lataamisessa');
        }
        
        log(`Kuva ladattu onnistuneesti: ${file.name}`);
        return data;
    } catch (error) {
        log(`Virhe kuvan lataamisessa: ${error.message}`, 'error');
        return { success: false, error: error.message };
    }
}

// Viedään funktiot globaaliin nimiavaruuteen
window.aiPatrikAPIClient = {
    createBlogPost,
    createReview,
    createGuide,
    createTool,
    deleteContent,
    uploadImage,
    version: API_VERSION
}; 