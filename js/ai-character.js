/**
 * AI Character for aipatrik.com
 * 
 * This script creates an interactive 3D character for the hero section
 * that responds to mouse movements across the entire screen and
 * displays a welcome message on page load.
 */

// ===== GLOBAL VARIABLES =====
let container, scene, camera, renderer;
let character, head, leftArm, rightArm, leftHand, rightHand;
let speechBubble;
let clock;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let currentRotationX = 0, currentRotationY = 0;
let targetHandRotationX = 0, targetHandRotationY = 0;
let currentHandRotationX = 0, currentHandRotationY = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let normalizedMouseX = 0; // Range: -1 to 1
let normalizedMouseY = 0; // Range: -1 to 1
let isWaving = false;
let waveAnimationMixer;
let waveAction;
let particles = [];
let debugElement;
let isDebugMode = false; // Disable debug mode in production
let isMouseTracking = true; // Flag to enable/disable mouse tracking
let isThreeJsAvailable = false; // Flag to check if Three.js is available
let isMobile = false; // Flag to check if device is mobile
let hasRendered = false; // Flag to check if character has been rendered at least once
let fallbackCreated = false; // Flag to check if fallback character has been created

// ===== SCENE SETUP =====
/**
 * Initialize the 3D scene and character
 */
function init() {
    try {
        console.log("Initializing AI character...");
        
        // Check if device is mobile
        isMobile = window.innerWidth <= 768;
        
        // Enable debug mode
        debugElement = document.getElementById('debug-info');
        if (debugElement && isDebugMode) {
            debugElement.style.display = 'block';
            updateDebugInfo('Initializing...');
        }
        
        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.error('THREE.js is not loaded');
            updateDebugInfo('ERROR: THREE.js is not loaded');
            createFallbackCharacter();
            return;
        }
        
        isThreeJsAvailable = true;
        
        // Get container
        container = document.getElementById('ai-character-container');
        if (!container) {
            console.error('Container not found');
            updateDebugInfo('ERROR: Container not found');
            return;
        }
        
        // Create scene
        scene = new THREE.Scene();
        
        // Create camera with perspective
        const aspectRatio = container.clientWidth / container.clientHeight;
        camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        camera.position.z = isMobile ? 5 : 4; // Adjust camera position for mobile
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        
        // Add renderer to container
        container.appendChild(renderer.domElement);
        
        // Setup lighting
        setupLighting();
        
        // Create character
        createCharacter();
        
        // Create particles
        createParticles();
        
        // Setup wave animation
        setupWaveAnimation();
        
        // Create speech bubble
        createSpeechBubble();
        
        // Add event listeners
        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onMouseMove);
        
        // Add touch event listeners for mobile
        document.addEventListener('touchstart', onTouchMove);
        document.addEventListener('touchmove', onTouchMove);
        
        // Initialize clock for animations
        clock = new THREE.Clock();
        
        // Show welcome message
        showWelcomeMessage();
        
        // Start animation loop
        animate();
        
        updateDebugInfo('Initialization complete');
    } catch (error) {
        console.error('Error initializing AI character:', error);
        updateDebugInfo('ERROR: ' + error.message);
        createFallbackCharacter();
    }
}

/**
 * Create a simple fallback character if Three.js is not available
 */
function createFallbackCharacter() {
    try {
        console.log("Creating fallback character...");
        
        // Get the container element
        container = document.getElementById('ai-character-container');
        if (!container) {
            console.error('Container not found');
            return;
        }
        
        // Clear container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        // Create a simple 2D character
        const characterDiv = document.createElement('div');
        characterDiv.className = 'fallback-character';
        characterDiv.innerHTML = `
            <div class="fallback-head">
                <div class="fallback-eye left"></div>
                <div class="fallback-eye right"></div>
                <div class="fallback-antenna"></div>
            </div>
            <div class="fallback-body">
                <div class="fallback-arm left"></div>
                <div class="fallback-arm right"></div>
            </div>
            <div class="fallback-legs">
                <div class="fallback-leg left"></div>
                <div class="fallback-leg right"></div>
            </div>
        `;
        
        container.appendChild(characterDiv);
        
        // Create speech bubble
        const speechBubbleDiv = document.createElement('div');
        speechBubbleDiv.className = 'ai-speech-bubble';
        speechBubbleDiv.textContent = 'Tervetuloa AI Patrikin maailmaan';
        speechBubbleDiv.style.opacity = '1';
        speechBubbleDiv.style.transform = 'translateY(0)';
        
        container.appendChild(speechBubbleDiv);
        
        // Add simple mouse tracking for the fallback character
        window.addEventListener('mousemove', (event) => {
            if (!characterDiv) return;
            
            const head = characterDiv.querySelector('.fallback-head');
            const leftArm = characterDiv.querySelector('.fallback-arm.left');
            const rightArm = characterDiv.querySelector('.fallback-arm.right');
            
            if (!head || !leftArm || !rightArm) return;
            
            // PEILATTU: Käännetään kaikki liikkeet päinvastaisiksi
            // Calculate how far mouse is from center of screen (as percentage)
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const mouseXPercent = (event.clientX / screenWidth - 0.5) * 2; // -1 to 1
            
            // KORJATTU: Lisätään ylös-alas-liike
            const mouseYPercent = (event.clientY / screenHeight - 0.5) * -2; // -1 to 1, käännetty suunta
            
            // PEILATTU: Käännetään rotaation suunta
            // Kun hiiri on oikealla, pää kääntyy vastapäivään (negatiivinen kulma)
            const headRotation = -mouseXPercent * 15; // Negatiivinen kerroin peilaa liikkeen
            
            // Apply rotations directly
            // KORJATTU: Lisätään ylös-alas-liike
            head.style.transform = `rotate(${headRotation}deg) translateY(${mouseYPercent * 10}px)`;
            
            // KORJATTU: Käsien liike osoittamaan selkeästi ylös ja alas hiiren mukaan
            // Käsien liikkeen voimakkuus
            const armRotationStrengthX = 30; // Sivuttaissuunnan rotaation voimakkuus
            const armTranslationStrengthY = 25; // Ylös-alas-siirtymän voimakkuus
            
            // Sivuttaissuunnan rotaatio - kädet kääntyvät sivusuunnassa
            // Kun hiiri on oikealla, kädet kääntyvät oikealle
            const armRotationX = mouseXPercent * armRotationStrengthX;
            
            // Ylös-alas-siirtymä - kädet siirtyvät ylös tai alas
            // Kun hiiri on ylhäällä, kädet siirtyvät ylös
            const armTranslateY = mouseYPercent * armTranslationStrengthY;
            
            // Sovelletaan transformaatiot
            // Molemmat kädet kääntyvät sivusuunnassa ja siirtyvät ylös-alas
            leftArm.style.transform = `
                rotate(${-armRotationX}deg) 
                translateY(${armTranslateY}px)
            `;
            
            rightArm.style.transform = `
                rotate(${armRotationX}deg) 
                translateY(${armTranslateY}px)
            `;
        });
        
        console.log("Fallback character created");
        
        // Add CSS for the fallback character
        const style = document.createElement('style');
        style.textContent = `
            .fallback-character {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .fallback-head {
                width: 80px;
                height: 80px;
                background-color: #0066cc;
                border-radius: 50%;
                position: relative;
                margin-bottom: 10px;
                transition: transform 0.3s ease;
            }
            
            .fallback-eye {
                position: absolute;
                width: 15px;
                height: 15px;
                background-color: #00ffff;
                border-radius: 50%;
                top: 25px;
            }
            
            .fallback-eye.left {
                left: 20px;
            }
            
            .fallback-eye.right {
                right: 20px;
            }
            
            .fallback-antenna {
                position: absolute;
                width: 5px;
                height: 20px;
                background-color: #00ccaa;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .fallback-body {
                width: 60px;
                height: 100px;
                background-color: #0066cc;
                border-radius: 10px;
                position: relative;
            }
            
            .fallback-arm {
                position: absolute;
                width: 15px;
                height: 70px;
                background-color: #0066cc;
                border-radius: 8px;
                top: 10px;
                transition: transform 0.3s ease;
            }
            
            .fallback-arm.left {
                left: -20px;
                transform-origin: top center;
            }
            
            .fallback-arm.right {
                right: -20px;
                transform-origin: top center;
            }
            
            .fallback-legs {
                display: flex;
                margin-top: 5px;
            }
            
            .fallback-leg {
                width: 15px;
                height: 40px;
                background-color: #0066cc;
                border-radius: 8px;
                margin: 0 5px;
            }
        `;
        
        document.head.appendChild(style);
    } catch (error) {
        console.error("Error creating fallback character:", error);
    }
}

/**
 * Setup lighting for the scene
 */
function setupLighting() {
    try {
        console.log("Setting up lighting...");
        
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);
    
    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
    scene.add(mainLight);
    
    // Add a blue rim light for tech effect
    const rimLight = new THREE.DirectionalLight(0x0088ff, 0.5);
        rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);
    
    // Add a subtle teal accent light
    const accentLight = new THREE.DirectionalLight(0x00ffcc, 0.3);
        accentLight.position.set(0, -5, 5);
    scene.add(accentLight);
        
        console.log("Lighting setup complete");
    } catch (error) {
        console.error("Lighting setup error:", error);
        updateDebugInfo("ERROR setting up lighting: " + error.message);
    }
}

/**
 * Create the 3D character
 */
function createCharacter() {
    try {
        console.log("Creating character...");
        
    // Make character available globally for animation
    window.character = character = new THREE.Group();
    scene.add(character);
    
    // Define materials with emissive properties for glow
        // Patrikin ihon väri (vaalea)
        const skinMaterial = new THREE.MeshPhongMaterial({
            color: 0xf5d0b0,         // Vaalea ihonsävy
            emissive: 0x553311,      // Lämmin hehku
            specular: 0xffffff,
            shininess: 20
        });
        
        // Hiusten materiaali (tumma)
        const hairMaterial = new THREE.MeshPhongMaterial({
            color: 0x221100,         // Tummanruskea
            emissive: 0x110800,      // Hieman hehkua
            specular: 0x554433,
        shininess: 30
    });
    
        // Silmien materiaali
    const eyeMaterial = new THREE.MeshPhongMaterial({
            color: 0x3366aa,         // Sininen
            emissive: 0x002244,      // Sininen hehku
        specular: 0xffffff,
        shininess: 90
    });
    
        // Suun materiaali
        const mouthMaterial = new THREE.MeshPhongMaterial({
            color: 0xcc6666,         // Vaalea punainen
            emissive: 0x441111,      // Hieman hehkua
            specular: 0xffffff,
            shininess: 50
        });
        
        // Create head - larger and more human-like
        const headGeometry = new THREE.SphereGeometry(0.65, 32, 32); // Larger and more detailed
        head = new THREE.Mesh(headGeometry, skinMaterial);
        head.position.set(0, 0, 0); // Täsmälleen keskellä
    character.add(head);
    
        // Lisää hiukset (Patrikilla on tummat hiukset)
        const hairGeometry = new THREE.SphereGeometry(0.67, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.position.y = 0.2;
        hair.rotation.x = -0.2; // Hieman kallistettu
        head.add(hair);
        
        // Lisää sivuhiukset
        const sideHairGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.6);
        const sideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
        sideHair.position.y = 0.2;
        sideHair.position.z = -0.2;
        head.add(sideHair);
        
        // Create eyes - more human-like with pupils
        const eyeGeometry = new THREE.SphereGeometry(0.1, 24, 24);
        const pupilGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const pupilMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            emissive: 0x000000,
            specular: 0x444444,
            shininess: 100
        });
        
        // Left eye with pupil
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.x = -0.2;
    leftEye.position.y = 0.05;
        leftEye.position.z = 0.55;
    head.add(leftEye);
    
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.z = 0.07;
        leftEye.add(leftPupil);
        
        // Right eye with pupil
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.x = 0.2;
    rightEye.position.y = 0.05;
        rightEye.position.z = 0.55;
    head.add(rightEye);
    
        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.z = 0.07;
        rightEye.add(rightPupil);
        
        // Lisää kulmakarvat (Patrikilla on tummat kulmakarvat)
        const eyebrowGeometry = new THREE.BoxGeometry(0.18, 0.03, 0.05);
        
        const leftEyebrow = new THREE.Mesh(eyebrowGeometry, hairMaterial);
        leftEyebrow.position.x = -0.2;
        leftEyebrow.position.y = 0.2;
        leftEyebrow.position.z = 0.58;
        leftEyebrow.rotation.z = 0.1; // Hieman vinossa
        head.add(leftEyebrow);
        
        const rightEyebrow = new THREE.Mesh(eyebrowGeometry, hairMaterial);
        rightEyebrow.position.x = 0.2;
        rightEyebrow.position.y = 0.2;
        rightEyebrow.position.z = 0.58;
        rightEyebrow.rotation.z = -0.1; // Hieman vinossa
        head.add(rightEyebrow);
        
        // Add mouth - simple curved line (Patrikin hymy)
        const mouthGeometry = new THREE.TorusGeometry(0.15, 0.03, 16, 32, Math.PI);
        const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
        mouth.position.y = -0.2;
        mouth.position.z = 0.55;
        mouth.rotation.x = -Math.PI / 2;
        mouth.rotation.z = Math.PI;
        head.add(mouth);
        
        // Add ears
        const earGeometry = new THREE.SphereGeometry(0.12, 16, 16, 0, Math.PI, 0, Math.PI);
        
        const leftEar = new THREE.Mesh(earGeometry, skinMaterial);
        leftEar.position.x = -0.65;
        leftEar.position.y = 0.05;
        leftEar.position.z = 0;
        leftEar.rotation.y = -Math.PI / 2;
        head.add(leftEar);
        
        const rightEar = new THREE.Mesh(earGeometry, skinMaterial);
        rightEar.position.x = 0.65;
        rightEar.position.y = 0.05;
        rightEar.position.z = 0;
        rightEar.rotation.y = Math.PI / 2;
        head.add(rightEar);
        
        // Lisää nenä (Patrikilla on selkeä nenä)
        const noseGeometry = new THREE.ConeGeometry(0.08, 0.2, 16);
        const nose = new THREE.Mesh(noseGeometry, skinMaterial);
        nose.position.z = 0.6;
        nose.position.y = -0.05;
        nose.rotation.x = -Math.PI / 2;
        head.add(nose);
        
        // Initialize empty arm references to prevent errors in other functions
        leftArm = new THREE.Group();
    rightArm = new THREE.Group();
        
        // Make arms invisible and non-functional
        leftArm.visible = false;
        rightArm.visible = false;
        
        // Add invisible arms to character to maintain references
        character.add(leftArm);
    character.add(rightArm);
    
        // Position character - perfectly centered in the container
        character.position.set(0, 0, 0);
        
        // Scale character to fit the container better
        character.scale.set(1.3, 1.3, 1.3);
        
        console.log("Character (head only) created successfully");
        updateDebugInfo("Character created (head only)");
        
        // Show welcome message after a short delay
        setTimeout(showWelcomeMessage, 1000);
    } catch (error) {
        console.error("Error creating character:", error);
        updateDebugInfo("ERROR creating character: " + error.message);
    }
}

/**
 * Add tech details to the character
 */
function addTechDetails(parentMesh, material) {
    // Add antenna to head
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
    const antenna = new THREE.Mesh(antennaGeometry, material);
    antenna.position.x = 0;
    antenna.position.y = 0.4;
    antenna.position.z = 0;
    parentMesh.add(antenna);
    
    // Add antenna tip (glowing)
    const antennaTipGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const antennaTipMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        specular: 0xffffff,
        shininess: 90
    });
    const antennaTip = new THREE.Mesh(antennaTipGeometry, antennaTipMaterial);
    antennaTip.position.x = 0;
    antennaTip.position.y = 0.6;
    antennaTip.position.z = 0;
    parentMesh.add(antennaTip);
}

/**
 * Create particles for ambient effects
 */
function createParticles() {
    const particleCount = 20;
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        specular: 0xffffff,
        shininess: 90
    });
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random position around character
        const theta = Math.random() * Math.PI * 2;
        const radius = 0.8 + Math.random() * 1.2;
        particle.position.x = Math.cos(theta) * radius;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.sin(theta) * radius;
        
        // Random scale
        const scale = 0.5 + Math.random() * 0.5;
        particle.scale.x = scale;
        particle.scale.y = scale;
        particle.scale.z = scale;
        
        // Store animation properties
        particle.userData = {
            speed: 0.2 + Math.random() * 0.3,
            offset: Math.random() * Math.PI * 2,
            amplitude: 0.1 + Math.random() * 0.2,
            opacitySpeed: 0.3 + Math.random() * 0.5
        };
        
        scene.add(particle);
        particles.push(particle);
    }
}

/**
 * Setup wave animation - empty function since we don't have arms anymore
 */
function setupWaveAnimation() {
    // No arms to animate
    console.log("Wave animation setup skipped (head-only character)");
}

/**
 * Play the wave animation - empty function since we don't have arms anymore
 */
function playWaveAnimation() {
    // No arms to animate
    console.log("Wave animation skipped (head-only character)");
}

/**
 * Create speech bubble for character
 */
function createSpeechBubble() {
    // Create speech bubble element
    speechBubble = document.createElement('div');
    speechBubble.className = 'ai-speech-bubble';
    
    // Position it initially above the character's head
    speechBubble.style.position = 'absolute';
    speechBubble.style.top = '0';
    speechBubble.style.left = '50%';
    speechBubble.style.transform = 'translateX(-50%) translateY(-120px)';
    speechBubble.style.zIndex = '1001'; // Korkeampi z-index, jotta näkyy varmasti
    
    // Add to container
    const container = document.getElementById('ai-character-container');
    if (container) {
    container.appendChild(speechBubble);
    }
}

/**
 * Update speech bubble position
 */
function updateSpeechBubblePosition() {
    if (!speechBubble || !container) return;
    
    // Asetetaan puhekupla hahmon yläpuolelle
    const containerRect = container.getBoundingClientRect();
    
    // Mobiilissa puhekupla on eri paikassa
    if (window.innerWidth <= 768) {
        // Asetetaan puhekupla selkeästi hahmon yläpuolelle
        speechBubble.style.position = 'absolute';
        speechBubble.style.bottom = 'auto';
        speechBubble.style.top = '-60px';
        speechBubble.style.left = '50%';
        speechBubble.style.transform = 'translateX(-50%)';
        speechBubble.style.zIndex = '1001';
        
        // Pienemmillä näytöillä
        if (window.innerWidth <= 576) {
            speechBubble.style.top = '-50px';
        }
        
        // Erittäin pienillä näytöillä
        if (window.innerWidth <= 400) {
            speechBubble.style.top = '-40px';
        }
    } else {
        // Työpöytäversiossa puhekupla on hahmon yläpuolella
        speechBubble.style.position = 'absolute';
        speechBubble.style.bottom = 'auto';
        speechBubble.style.top = '0';
        speechBubble.style.left = '50%';
        speechBubble.style.transform = 'translateX(-50%) translateY(-120px)';
        speechBubble.style.zIndex = '1001';
    }
}

/**
 * Show welcome message in speech bubble
 */
function showWelcomeMessage() {
    if (!speechBubble) {
        createSpeechBubble();
    }
    
    // Set welcome message
    speechBubble.innerHTML = 'Hei! Olen Patrik, tekoälyasiantuntijasi. Tervetuloa!';
    
    // Make visible with animation
    speechBubble.style.opacity = '1';
    
    // Update position based on container size
    updateSpeechBubblePosition();
    
    // Varmistetaan että puhekupla päivittyy myös kun sivu on täysin latautunut
    setTimeout(updateSpeechBubblePosition, 500);
    
    // Hide after a delay
    setTimeout(function() {
        if (speechBubble) {
            speechBubble.style.opacity = '0';
            
            // Show another message after a delay
            setTimeout(function() {
                if (speechBubble) {
                    speechBubble.innerHTML = 'Tutustutaan yhdessä tekoälyn mahdollisuuksiin!';
    speechBubble.style.opacity = '1';
                    
                    // Update position again to ensure it's visible
                    updateSpeechBubblePosition();
                    
                    // Varmistetaan että puhekupla päivittyy myös kun sivu on täysin latautunut
                    setTimeout(updateSpeechBubblePosition, 500);
    
                    // Hide after another delay
                    setTimeout(function() {
                        if (speechBubble) {
        speechBubble.style.opacity = '0';
                        }
                    }, 5000);
                }
            }, 1000);
        }
    }, 5000);
}

/**
 * Handle mouse movement to track cursor
 */
function onMouseMove(event) {
    try {
        // Calculate mouse coordinates
    mouseX = event.clientX;
    mouseY = event.clientY;
    
        // Calculate normalized mouse coordinates (-1 to 1)
    normalizedMouseX = (mouseX / windowWidth) * 2 - 1;
    normalizedMouseY = -((mouseY / windowHeight) * 2 - 1);
    
        // Update debug info
        if (isDebugMode && debugElement) {
            updateDebugInfo(
                'Mouse: ' + Math.round(mouseX) + ', ' + Math.round(mouseY) + 
                '<br>Normalized: ' + Math.round(normalizedMouseX * 100) / 100 + ', ' + 
                Math.round(normalizedMouseY * 100) / 100
            );
        }
    } catch (error) {
        console.error("Mouse tracking error:", error);
    }
}

/**
 * Handle touch events for mobile devices
 */
function onTouchMove(event) {
    if (!isMouseTracking || !isThreeJsAvailable) return;
    
    // Prevent default behavior to avoid scrolling
    // event.preventDefault();
    
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        
        // Calculate mouse position
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        
        // Calculate normalized mouse position (-1 to 1)
        normalizedMouseX = (mouseX / windowWidth) * 2 - 1;
        normalizedMouseY = -((mouseY / windowHeight) * 2 - 1);
        
        // Limit rotation range
        targetRotationY = normalizedMouseX * 0.3;
        targetRotationX = normalizedMouseY * 0.2;
        
        // Limit hand rotation range
        targetHandRotationY = normalizedMouseX * 0.5;
        targetHandRotationX = normalizedMouseY * 0.3;
        
        updateDebugInfo(`Touch: ${Math.round(normalizedMouseX * 100) / 100}, ${Math.round(normalizedMouseY * 100) / 100}`);
    }
}

/**
 * Handle window resize
 */
function onWindowResize() {
    if (!isThreeJsAvailable) return;
    
    // Update window dimensions
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    // Check if device is mobile
    isMobile = windowWidth <= 768;
    
    // Update camera
    const aspectRatio = container.clientWidth / container.clientHeight;
    camera.aspect = aspectRatio;
    camera.position.z = isMobile ? 5 : 4; // Adjust camera position for mobile
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Update speech bubble position
    updateSpeechBubblePosition();
    
    updateDebugInfo(`Resize: ${windowWidth}x${windowHeight}, Mobile: ${isMobile}`);
}

/**
 * Animation loop
 */
function animate() {
    if (!isThreeJsAvailable) return;
    
    requestAnimationFrame(animate);
    
    // Get delta time
    const delta = clock.getDelta();
    
    // Update character
    updateCharacter(delta);
    
    // Update particles
    animateParticles(delta);
    
    // Update wave animation
    if (waveAnimationMixer) {
        waveAnimationMixer.update(delta);
    }
    
    // Render scene
    renderer.render(scene, camera);
    
    // Set flag that character has been rendered
    if (!hasRendered) {
        hasRendered = true;
        updateDebugInfo('First render complete');
        
        // If on mobile, reduce animation complexity after first render
        if (isMobile) {
            // Reduce particle count
            while (particles.length > 20) {
                const particle = particles.pop();
                scene.remove(particle);
            }
        }
    }
}

/**
 * Update character based on mouse position
 */
function updateCharacter(delta) {
    // Only update character if Three.js is available
    if (!isThreeJsAvailable) return;
    
    if (!character || !head) return;
    
    if (isMouseTracking) {
        // Head rotation - track mouse movement
        const targetHeadRotationY = normalizedMouseX * 0.8;
        const targetHeadRotationX = normalizedMouseY * -0.5;
        
        // Smoothly interpolate current rotation towards target
        head.rotation.y += (targetHeadRotationY - head.rotation.y) * 8 * delta;
        head.rotation.x += (targetHeadRotationX - head.rotation.x) * 8 * delta;
        
        // Apply limits to prevent unnatural angles
        const maxHeadRotationY = 1.0;
        const maxHeadRotationX = 0.7;
        head.rotation.y = Math.max(-maxHeadRotationY, Math.min(maxHeadRotationY, head.rotation.y));
        head.rotation.x = Math.max(-maxHeadRotationX, Math.min(maxHeadRotationX, head.rotation.x));
    }
    
    // Subtle floating movement - rajoitettu pienemmäksi, jotta hahmo pysyy paremmin keskellä
    const floatAmplitude = 0.03; // Pienempi arvo pitää hahmon lähempänä keskipistettä
    character.position.y = Math.sin(clock.elapsedTime * 0.5) * floatAmplitude;
    
    // Varmistetaan että hahmo pysyy keskellä x- ja z-akseleilla
    character.position.x = 0;
    character.position.z = 0;
}

/**
 * Animate particles
 */
function animateParticles(delta) {
    if (particles.length === 0) return;
    
    const time = clock.elapsedTime;
    
    particles.forEach(particle => {
        const data = particle.userData;
        
        // Circular motion
        const angle = time * data.speed + data.offset;
        particle.position.x = Math.cos(angle) * (0.8 + data.amplitude);
        particle.position.z = Math.sin(angle) * (0.8 + data.amplitude);
        
        // Vertical bobbing
        particle.position.y += Math.sin(time * data.speed) * 0.005;
    });
}

/**
 * Update debug information
 */
function updateDebugInfo(message) {
    if (debugElement && isDebugMode) {
        debugElement.innerHTML = message;
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure DOM is fully loaded
    setTimeout(function() {
        try {
            init();
        } catch (error) {
            console.error('Error initializing AI character:', error);
            if (!fallbackCreated) {
                createFallbackCharacter();
            }
        }
    }, 500);
}); 