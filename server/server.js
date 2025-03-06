// AI Patrik - Server-side implementation
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_DIR = process.env.CONTENT_DIR || '../';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Basic authentication middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];
    
    if (username === process.env.API_USERNAME && password === process.env.API_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.params.type;
        let uploadPath;
        
        switch (type) {
            case 'blog':
                uploadPath = path.join(__dirname, CONTENT_DIR, 'pages/blogi');
                break;
            case 'review':
                uploadPath = path.join(__dirname, CONTENT_DIR, 'pages/arvostelut');
                break;
            case 'guide':
                uploadPath = path.join(__dirname, CONTENT_DIR, 'pages/oppaat');
                break;
            case 'tool':
                uploadPath = path.join(__dirname, CONTENT_DIR, 'pages/tyokalut');
                break;
            default:
                uploadPath = path.join(__dirname, CONTENT_DIR, 'uploads');
        }
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Helper function to create HTML file
const createHtmlFile = (type, data, res) => {
    try {
        const { slug, htmlContent } = data;
        let filePath;
        
        switch (type) {
            case 'blog':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/blogi', `${slug}.html`);
                break;
            case 'review':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/arvostelut', `${slug}.html`);
                break;
            case 'guide':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/oppaat', `${slug}.html`);
                break;
            case 'tool':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/tyokalut', `${slug}.html`);
                break;
            default:
                return res.status(400).json({ error: 'Invalid content type' });
        }
        
        // Create directory if it doesn't exist
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write the HTML content to the file
        fs.writeFileSync(filePath, htmlContent);
        
        // Update the listing page
        updateListingPage(type, data);
        
        return res.status(200).json({ 
            success: true, 
            message: `${type} created successfully`,
            filePath: filePath.replace(__dirname, '')
        });
    } catch (error) {
        console.error(`Error creating ${type}:`, error);
        return res.status(500).json({ error: `Error creating ${type}`, details: error.message });
    }
};

// Helper function to update listing page
const updateListingPage = (type, data) => {
    try {
        const { title, slug, excerpt, created } = data;
        let listingPath;
        let listingFile;
        
        switch (type) {
            case 'blog':
                listingPath = path.join(__dirname, CONTENT_DIR, 'pages');
                listingFile = 'blogi.html';
                break;
            case 'review':
                listingPath = path.join(__dirname, CONTENT_DIR, 'pages');
                listingFile = 'arvostelut.html';
                break;
            case 'guide':
                listingPath = path.join(__dirname, CONTENT_DIR, 'pages');
                listingFile = 'oppaat.html';
                break;
            case 'tool':
                listingPath = path.join(__dirname, CONTENT_DIR, 'pages');
                listingFile = 'tyokalut.html';
                break;
            default:
                return;
        }
        
        const fullPath = path.join(listingPath, listingFile);
        
        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            console.warn(`Listing file ${fullPath} does not exist. Skipping update.`);
            return;
        }
        
        // Read the file
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Find the content list section
        const contentListRegex = new RegExp(`<div class="${type}-list">([\\s\\S]*?)<\\/div>`);
        const contentListMatch = content.match(contentListRegex);
        
        if (!contentListMatch) {
            console.warn(`Content list section not found in ${fullPath}. Skipping update.`);
            return;
        }
        
        // Create a new item HTML
        const date = new Date(created).toLocaleDateString('fi-FI');
        let newItem = '';
        
        switch (type) {
            case 'blog':
                newItem = `
                <div class="blog-item">
                    <h3><a href="blogi/${slug}.html">${title}</a></h3>
                    <div class="blog-meta">
                        <span class="date"><i class="far fa-calendar-alt"></i> ${date}</span>
                    </div>
                    <p>${excerpt}</p>
                    <a href="blogi/${slug}.html" class="read-more">Lue lisää <i class="fas fa-arrow-right"></i></a>
                </div>`;
                break;
            case 'review':
                newItem = `
                <div class="review-item">
                    <h3><a href="arvostelut/${slug}.html">${title}</a></h3>
                    <div class="review-meta">
                        <span class="date"><i class="far fa-calendar-alt"></i> ${date}</span>
                    </div>
                    <p>${excerpt}</p>
                    <a href="arvostelut/${slug}.html" class="read-more">Lue arvostelu <i class="fas fa-arrow-right"></i></a>
                </div>`;
                break;
            case 'guide':
                newItem = `
                <div class="guide-item">
                    <h3><a href="oppaat/${slug}.html">${title}</a></h3>
                    <div class="guide-meta">
                        <span class="date"><i class="far fa-calendar-alt"></i> ${date}</span>
                    </div>
                    <p>${excerpt}</p>
                    <a href="oppaat/${slug}.html" class="read-more">Lue opas <i class="fas fa-arrow-right"></i></a>
                </div>`;
                break;
            case 'tool':
                newItem = `
                <div class="tool-item">
                    <h3><a href="tyokalut/${slug}.html">${title}</a></h3>
                    <div class="tool-meta">
                        <span class="date"><i class="far fa-calendar-alt"></i> ${date}</span>
                    </div>
                    <p>${excerpt}</p>
                    <a href="tyokalut/${slug}.html" class="read-more">Lue lisää <i class="fas fa-arrow-right"></i></a>
                </div>`;
                break;
        }
        
        // Insert the new item at the beginning of the content list
        const newContentList = `<div class="${type}-list">${newItem}${contentListMatch[1]}`;
        content = content.replace(contentListRegex, newContentList);
        
        // Write the updated content back to the file
        fs.writeFileSync(fullPath, content, 'utf8');
        
        console.log(`Updated listing page ${fullPath}`);
    } catch (error) {
        console.error(`Error updating listing page for ${type}:`, error);
    }
};

// API Routes
// Create blog post
app.post('/api/blog', authenticate, (req, res) => {
    createHtmlFile('blog', req.body, res);
});

// Create review
app.post('/api/review', authenticate, (req, res) => {
    createHtmlFile('review', req.body, res);
});

// Create guide
app.post('/api/guide', authenticate, (req, res) => {
    createHtmlFile('guide', req.body, res);
});

// Create tool
app.post('/api/tool', authenticate, (req, res) => {
    createHtmlFile('tool', req.body, res);
});

// Upload image
app.post('/api/upload/:type', authenticate, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    return res.status(200).json({ 
        success: true, 
        message: 'File uploaded successfully',
        filePath: req.file.path.replace(__dirname, '')
    });
});

// Delete content
app.delete('/api/:type/:slug', authenticate, (req, res) => {
    try {
        const { type, slug } = req.params;
        let filePath;
        
        switch (type) {
            case 'blog':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/blogi', `${slug}.html`);
                break;
            case 'review':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/arvostelut', `${slug}.html`);
                break;
            case 'guide':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/oppaat', `${slug}.html`);
                break;
            case 'tool':
                filePath = path.join(__dirname, CONTENT_DIR, 'pages/tyokalut', `${slug}.html`);
                break;
            default:
                return res.status(400).json({ error: 'Invalid content type' });
        }
        
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        // Delete the file
        fs.unlinkSync(filePath);
        
        return res.status(200).json({ 
            success: true, 
            message: `${type} deleted successfully`
        });
    } catch (error) {
        console.error(`Error deleting content:`, error);
        return res.status(500).json({ error: 'Error deleting content', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Content directory: ${path.join(__dirname, CONTENT_DIR)}`);
}); 