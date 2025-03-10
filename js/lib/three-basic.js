// Three.js basic implementation
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
}

class Euler {
    constructor(x = 0, y = 0, z = 0, order = 'XYZ') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
    
    set(x, y, z, order) {
        this.x = x;
        this.y = y;
        this.z = z;
        if (order !== undefined) this.order = order;
        return this;
    }
}

class Color {
    constructor(r, g, b) {
        if (typeof r === 'number') {
            this.setHex(r);
        } else {
            this.r = 1;
            this.g = 1;
            this.b = 1;
        }
    }
    
    setHex(hex) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        return this;
    }
}

class Object3D {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Euler();
        this.scale = new Vector3(1, 1, 1);
        this.children = [];
        this.parent = null;
    }
    
    add(object) {
        if (object === this) return this;
        
        if (object.parent !== null) {
            object.parent.remove(object);
        }
        
        object.parent = this;
        this.children.push(object);
        
        return this;
    }
    
    remove(object) {
        const index = this.children.indexOf(object);
        
        if (index !== -1) {
            object.parent = null;
            this.children.splice(index, 1);
        }
        
        return this;
    }
}

class Group extends Object3D {
    constructor() {
        super();
    }
}

class Scene extends Object3D {
    constructor() {
        super();
        this.background = null;
    }
}

class PerspectiveCamera extends Object3D {
    constructor(fov, aspect, near, far) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    
    updateProjectionMatrix() {
        // Placeholder for updating projection matrix
    }
}

class WebGLRenderer {
    constructor(options = {}) {
        this.domElement = document.createElement('canvas');
        this.domElement.style.width = '100%';
        this.domElement.style.height = '100%';
        this.domElement.style.display = 'block';
    }
    
    setSize(width, height) {
        this.domElement.width = width;
        this.domElement.height = height;
    }
    
    setPixelRatio(ratio) {
        // Placeholder for setting pixel ratio
    }
    
    setClearColor(color, alpha) {
        // Placeholder for setting clear color
    }
    
    render(scene, camera) {
        // Placeholder for rendering
        // In a real implementation, this would render the scene
        
        // For our simple implementation, we'll just draw a colored background
        const ctx = this.domElement.getContext('2d');
        ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
        
        // Draw all meshes in the scene
        this._renderObject(scene, ctx);
    }
    
    _renderObject(object, ctx) {
        // Render this object if it's a mesh
        if (object instanceof Mesh) {
            this._renderMesh(object, ctx);
        }
        
        // Render all children
        for (const child of object.children) {
            this._renderObject(child, ctx);
        }
    }
    
    _renderMesh(mesh, ctx) {
        const width = this.domElement.width;
        const height = this.domElement.height;
        
        // Simple rendering for different geometry types
        if (mesh.geometry instanceof BoxGeometry) {
            // Draw a rectangle for box geometry
            const x = width / 2 + mesh.position.x * 50;
            const y = height / 2 - mesh.position.y * 50;
            const w = mesh.geometry.width * 50 * mesh.scale.x;
            const h = mesh.geometry.height * 50 * mesh.scale.y;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(mesh.rotation.z);
            
            if (mesh.material.wireframe) {
                ctx.strokeStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.strokeRect(-w/2, -h/2, w, h);
            } else {
                ctx.fillStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            
            ctx.restore();
        } else if (mesh.geometry instanceof SphereGeometry) {
            // Draw a circle for sphere geometry
            const x = width / 2 + mesh.position.x * 50;
            const y = height / 2 - mesh.position.y * 50;
            const radius = mesh.geometry.radius * 50 * Math.max(mesh.scale.x, mesh.scale.y);
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            
            if (mesh.material.wireframe) {
                ctx.strokeStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.stroke();
            } else {
                ctx.fillStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.fill();
            }
        } else if (mesh.geometry instanceof CylinderGeometry) {
            // Draw a rectangle for cylinder geometry (simplified)
            const x = width / 2 + mesh.position.x * 50;
            const y = height / 2 - mesh.position.y * 50;
            const w = mesh.geometry.radiusTop * 2 * 50 * mesh.scale.x;
            const h = mesh.geometry.height * 50 * mesh.scale.y;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(mesh.rotation.z);
            
            if (mesh.material.wireframe) {
                ctx.strokeStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.strokeRect(-w/2, -h/2, w, h);
            } else {
                ctx.fillStyle = `rgb(${mesh.material.color.r * 255}, ${mesh.material.color.g * 255}, ${mesh.material.color.b * 255})`;
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            
            ctx.restore();
        }
    }
}

class Geometry {
    constructor() {
        // Base geometry class
    }
}

class BoxGeometry extends Geometry {
    constructor(width, height, depth) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
}

class SphereGeometry extends Geometry {
    constructor(radius, widthSegments, heightSegments) {
        super();
        this.radius = radius;
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;
    }
}

class CylinderGeometry extends Geometry {
    constructor(radiusTop, radiusBottom, height, radialSegments) {
        super();
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.height = height;
        this.radialSegments = radialSegments;
    }
}

class Material {
    constructor() {
        // Base material class
    }
}

class MeshBasicMaterial extends Material {
    constructor(options = {}) {
        super();
        this.color = options.color !== undefined ? new Color(options.color) : new Color(0xffffff);
        this.wireframe = options.wireframe !== undefined ? options.wireframe : false;
    }
}

class MeshPhongMaterial extends Material {
    constructor(options = {}) {
        super();
        this.color = options.color !== undefined ? new Color(options.color) : new Color(0xffffff);
        this.emissive = options.emissive !== undefined ? new Color(options.emissive) : new Color(0x000000);
        this.specular = options.specular !== undefined ? new Color(options.specular) : new Color(0x111111);
        this.shininess = options.shininess !== undefined ? options.shininess : 30;
        this.wireframe = options.wireframe !== undefined ? options.wireframe : false;
    }
}

class Mesh extends Object3D {
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}

class Light extends Object3D {
    constructor(color, intensity) {
        super();
        this.color = new Color(color);
        this.intensity = intensity;
    }
}

class DirectionalLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
    }
}

class AmbientLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
    }
}

class Clock {
    constructor(autoStart = true) {
        this.autoStart = autoStart;
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
        
        if (this.autoStart) {
            this.start();
        }
    }
    
    start() {
        this.startTime = now();
        this.oldTime = this.startTime;
        this.elapsedTime = 0;
        this.running = true;
    }
    
    getDelta() {
        let diff = 0;
        
        if (this.running) {
            const newTime = now();
            diff = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;
            this.elapsedTime += diff;
        }
        
        return diff;
    }
}

// Helper function to get current time in milliseconds
function now() {
    return (typeof performance === 'undefined' ? Date : performance).now();
}

// Animation system
class AnimationMixer {
    constructor(root) {
        this.root = root;
        this._actions = [];
        this._activeActions = [];
    }
    
    clipAction(clip) {
        const action = new AnimationAction(this, clip);
        this._actions.push(action);
        return action;
    }
    
    update(deltaTime) {
        for (const action of this._activeActions) {
            action.update(deltaTime);
        }
    }
    
    _addActiveAction(action) {
        if (this._activeActions.indexOf(action) === -1) {
            this._activeActions.push(action);
        }
    }
    
    _removeActiveAction(action) {
        const index = this._activeActions.indexOf(action);
        if (index !== -1) {
            this._activeActions.splice(index, 1);
        }
    }
}

class AnimationAction {
    constructor(mixer, clip) {
        this.mixer = mixer;
        this.clip = clip;
        this.timeScale = 1;
        this.loop = true;
        this.clampWhenFinished = false;
        this.time = 0;
        this.isRunning = false;
    }
    
    play() {
        this.isRunning = true;
        this.mixer._addActiveAction(this);
        return this;
    }
    
    stop() {
        this.isRunning = false;
        this.mixer._removeActiveAction(this);
        return this;
    }
    
    reset() {
        this.time = 0;
        return this;
    }
    
    setLoop(loopMode) {
        this.loop = loopMode;
        return this;
    }
    
    update(deltaTime) {
        if (!this.isRunning) return;
        
        this.time += deltaTime * this.timeScale;
        
        // Check if animation is complete
        if (this.time >= this.clip.duration) {
            if (this.loop) {
                // Loop back to start
                this.time = this.time % this.clip.duration;
            } else {
                // Stop at end
                this.time = this.clip.duration;
                
                if (!this.clampWhenFinished) {
                    this.stop();
                }
            }
        }
        
        // Apply animation at current time
        this.clip.apply(this.time);
    }
}

class AnimationClip {
    constructor(name, duration, tracks) {
        this.name = name;
        this.duration = duration;
        this.tracks = tracks;
    }
    
    apply(time) {
        for (const track of this.tracks) {
            track.apply(time);
        }
    }
}

class KeyframeTrack {
    constructor(name, times, values) {
        this.name = name;
        this.times = times;
        this.values = values;
        
        // Parse the property path
        const parts = name.split('.');
        this.objectName = parts[0];
        this.propertyName = parts[1];
        this.index = parts[2] !== undefined ? parseInt(parts[2].replace(/[\[\]]/g, '')) : undefined;
    }
    
    apply(time) {
        // Find the appropriate keyframe
        let i = 0;
        while (i < this.times.length && time > this.times[i]) {
            i++;
        }
        
        if (i === 0) {
            // Before first keyframe, use first value
            this._setValue(this.values[0]);
        } else if (i === this.times.length) {
            // After last keyframe, use last value
            this._setValue(this.values[this.values.length - 1]);
        } else {
            // Interpolate between keyframes
            const t1 = this.times[i - 1];
            const t2 = this.times[i];
            const alpha = (time - t1) / (t2 - t1);
            
            const v1 = this.values[i - 1];
            const v2 = this.values[i];
            const value = v1 + (v2 - v1) * alpha;
            
            this._setValue(value);
        }
    }
    
    _setValue(value) {
        // Find the target object
        const object = this._findObject(this.objectName);
        if (!object) return;
        
        // Set the property value
        if (this.index !== undefined) {
            object[this.propertyName][this.index] = value;
        } else {
            object[this.propertyName] = value;
        }
    }
    
    _findObject(name) {
        // This is a simplified implementation
        // In a real implementation, this would search the scene graph
        return window.character;
    }
}

// Constants
const LoopOnce = 2200;

// Export THREE object
window.THREE = {
    Vector3,
    Euler,
    Color,
    Object3D,
    Group,
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Geometry,
    BoxGeometry,
    SphereGeometry,
    CylinderGeometry,
    Material,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Mesh,
    Light,
    DirectionalLight,
    AmbientLight,
    Clock,
    AnimationMixer,
    AnimationClip,
    KeyframeTrack,
    LoopOnce
}; 