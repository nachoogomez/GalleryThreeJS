import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Creamos la scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a2a2a); // Fondo oscuro para galería

// Creamos camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 5); // Altura ajustada para estar a nivel de las obras (4m)

// Creamos el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Cambiamos a PointerLockControls para movimiento FPS
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

// Objeto para las teclas presionadas
const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Variables para el movimiento
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Event listeners para el teclado
document.addEventListener('keydown', (event) => {
    if (event.key in keysPressed) {
        keysPressed[event.key] = true;
    }

    switch(event.key) {
        case 'w':
        case 'ArrowUp':
            moveForward = true;
            break;
        case 's':
        case 'ArrowDown':
            moveBackward = true;
            break;
        case 'a':
        case 'ArrowLeft':
            moveLeft = true;
            break;
        case 'd':
        case 'ArrowRight':
            moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keysPressed) {
        keysPressed[event.key] = false;
    }

    switch(event.key) {
        case 'w':
        case 'ArrowUp':
            moveForward = false;
            break;
        case 's':
        case 'ArrowDown':
            moveBackward = false;
            break;
        case 'a':
        case 'ArrowLeft':
            moveLeft = false;
            break;
        case 'd':
        case 'ArrowRight':
            moveRight = false;
            break;
    }
});

// Gestión del menú de inicio
const instructionsElement = document.getElementById('instructions');
const startButton = document.getElementById('start-button');
const infoPanelElement = document.getElementById('info-panel');

startButton.addEventListener('click', () => {
    instructionsElement.classList.add('hidden');
    infoPanelElement.classList.remove('hidden');
    controls.lock();
});

// Mostrar/ocultar panel de información cuando se bloquea/desbloquea el pointer
controls.addEventListener('lock', () => {
    infoPanelElement.classList.remove('hidden');
});

controls.addEventListener('unlock', () => {
    // No ocultar el panel automáticamente para que el usuario pueda ver las instrucciones
});

// Iluminación mejorada
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Aumentada la luz ambiente
scene.add(ambientLight);

// Luz principal direccional para iluminación general
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);

// Luz hemisférica para iluminación más natural
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
hemisphereLight.position.set(0, 10, 0);
scene.add(hemisphereLight);

// Luces puntuales para iluminar los cuadros específicamente
const createPaintingLight = (x, y, z) => {
    const light = new THREE.PointLight(0xfff8e1, 1.2, 8); // Luz cálida más intensa
    light.position.set(x, y, z);
    light.castShadow = false; // Desactivar sombras para mejor rendimiento
    scene.add(light);

    // Agregar una segunda luz más suave para resaltar
    const accentLight = new THREE.SpotLight(0xffffff, 0.6, 10, Math.PI / 6);
    accentLight.position.set(x, y + 1, z);
    accentLight.target.position.set(x, y, z - 1);
    scene.add(accentLight);
    scene.add(accentLight.target);
};

// Crear el piso
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.2
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Crear el techo
const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.9
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 10;
scene.add(ceiling);

// Crear las paredes
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.7
});

// Pared trasera
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
backWall.position.z = -10;
backWall.position.y = 5;
backWall.receiveShadow = true;
scene.add(backWall);

// Pared frontal
const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
frontWall.position.z = 10;
frontWall.position.y = 5;
frontWall.rotation.y = Math.PI;
frontWall.receiveShadow = true;
scene.add(frontWall);

// Pared izquierda
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
leftWall.position.x = -10;
leftWall.position.y = 5;
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Pared derecha
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
rightWall.position.x = 10;
rightWall.position.y = 5;
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// TextureLoader para cargar imágenes
const textureLoader = new THREE.TextureLoader();

// Array para almacenar las pinturas
const paintings = [];

// Función para crear un cuadro/pintura con imagen
const createPainting = (width, height, imagePath, x, y, z, rotationY = 0, info = {}) => {
    // Marco del cuadro
    const frameGeometry = new THREE.BoxGeometry(width + 0.2, height + 0.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.5,
        metalness: 0.3
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);

    // Canvas/lienzo con textura de imagen
    const canvasGeometry = new THREE.PlaneGeometry(width, height);
    const texture = textureLoader.load(imagePath);
    const canvasMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.6
    });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = 0.06;

    // Guardar información en userData
    canvas.userData = {
        type: 'painting',
        info: info,
        title: info.title || 'Sin título',
        artist: info.artist || 'Artista desconocido',
        description: info.description || 'Sin descripción',
        year: info.year || 'Año desconocido'
    };

    frame.add(canvas);
    frame.position.set(x, y, z);
    frame.rotation.y = rotationY;
    frame.castShadow = true;

    scene.add(frame);
    paintings.push(canvas);

    // Agregar luz para este cuadro
    const lightOffset = rotationY === 0 ? 2 : (rotationY === Math.PI ? -2 : 0);
    const lightX = rotationY === Math.PI / 2 ? x - 2 : (rotationY === -Math.PI / 2 ? x + 2 : x);
    const lightZ = rotationY === 0 ? z + 2 : (rotationY === Math.PI ? z - 2 : z);
    createPaintingLight(lightX, y, lightZ);

    return canvas;
};

// Función para crear un placeholder "Próximamente"
const createPlaceholder = (width, height, x, y, z, rotationY = 0) => {
    // Marco del cuadro
    const frameGeometry = new THREE.BoxGeometry(width + 0.2, height + 0.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.5,
        metalness: 0.3
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);

    // Canvas/lienzo en blanco
    const canvasGeometry = new THREE.PlaneGeometry(width, height);
    const canvasMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5f5,
        roughness: 0.8
    });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = 0.06;

    // Agregar texto "Próximamente" usando una geometría simple
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 512;
    textCanvas.height = 512;
    const ctx = textCanvas.getContext('2d');
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#666666';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PRÓXIMAMENTE', 256, 256);

    const textTexture = new THREE.CanvasTexture(textCanvas);
    const textMaterial = new THREE.MeshStandardMaterial({
        map: textTexture,
        roughness: 0.8
    });
    canvas.material = textMaterial;

    frame.add(canvas);
    frame.position.set(x, y, z);
    frame.rotation.y = rotationY;
    frame.castShadow = true;

    scene.add(frame);

    // Agregar luz para este cuadro
    const lightOffset = rotationY === 0 ? 2 : (rotationY === Math.PI ? -2 : 0);
    const lightX = rotationY === Math.PI / 2 ? x - 2 : (rotationY === -Math.PI / 2 ? x + 2 : x);
    const lightZ = rotationY === 0 ? z + 2 : (rotationY === Math.PI ? z - 2 : z);
    createPaintingLight(lightX, y, lightZ);
};

// Crear cuadros en la pared trasera con imágenes reales (solo las 4 disponibles)
createPainting(3, 2, '/artworks/0.jpg', -5, 4, -9.9, 0, {
    title: 'Obra 1',
    artist: 'Artista',
    description: 'Pintura impresionista que captura la luz y el color',
    year: '2024'
});
createPainting(2.5, 3, '/artworks/01.jpg', 0, 4, -9.9, 0, {
    title: 'Obra 2',
    artist: 'Artista',
    description: 'Una obra maestra del arte moderno',
    year: '2024'
});
createPainting(3, 2, '/artworks/02.jpg', 5, 4, -9.9, 0, {
    title: 'Obra 3',
    artist: 'Artista',
    description: 'Expresión artística contemporánea',
    year: '2024'
});

// Crear cuadros en la pared izquierda
createPainting(2, 2.5, '/artworks/03.jpg', -9.9, 4, -5, Math.PI / 2, {
    title: 'Obra 4',
    artist: 'Artista',
    description: 'Composición única de formas y colores',
    year: '2024'
});
// Placeholders para obras futuras
createPlaceholder(3, 2, -9.9, 4, 0, Math.PI / 2);
createPlaceholder(2, 2.5, -9.9, 4, 5, Math.PI / 2);

// Crear cuadros en la pared derecha - todos placeholders
createPlaceholder(2.5, 2, 9.9, 4, -5, -Math.PI / 2);
createPlaceholder(3, 2.5, 9.9, 4, 0, -Math.PI / 2);
createPlaceholder(2, 2, 9.9, 4, 5, -Math.PI / 2);

// Crear cuadros en la pared frontal - todos placeholders
createPlaceholder(2.5, 2.5, -4, 4, 9.9, Math.PI);
createPlaceholder(3, 2, 4, 4, 9.9, Math.PI);

// Agregar algunas esculturas (cubos y esferas como decoración)
const sculptureGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.8);
const sculptureMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.7
});

const sculpture1 = new THREE.Mesh(sculptureGeometry, sculptureMaterial);
sculpture1.position.set(-6, 0.75, 3);
sculpture1.castShadow = true;
scene.add(sculpture1);

const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const sculpture2 = new THREE.Mesh(sphereGeometry, sculptureMaterial);
sculpture2.position.set(6, 1.2, -3);
sculpture2.castShadow = true;
scene.add(sculpture2);

// Manejar el resize de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Raycaster para detectar clics en pinturas
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener para clics
window.addEventListener('click', (event) => {
    if (!controls.isLocked) return;

    // Calcular posición del mouse
    mouse.x = 0;
    mouse.y = 0;

    // Configurar raycaster desde el centro de la pantalla
    raycaster.setFromCamera(mouse, camera);

    // Verificar intersecciones con las pinturas
    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        const painting = intersects[0].object;
        if (painting.userData.type === 'painting') {
            showPaintingInfo(painting.userData);
        }
    }
});

// Función para mostrar información de la pintura
function showPaintingInfo(userData) {
    const info = `
        Título: ${userData.title}
        Artista: ${userData.artist}
        Año: ${userData.year}
        Descripción: ${userData.description}
    `;
    alert(info);
}

// Variables para el control de tiempo
const clock = new THREE.Clock();

// Función para verificar colisiones con margen de seguridad
function checkCollision(position) {
    const collisionMargin = 0.8; // Margen de seguridad para evitar rebotes

    // Verificar colisión con paredes con margen
    const wallBounds = [
        { min: { x: -10.5, z: -10.5 }, max: { x: 10.5, z: -8.5 } }, // Pared trasera (más margen)
        { min: { x: -10.5, z: 8.5 }, max: { x: 10.5, z: 10.5 } },   // Pared frontal (más margen)
        { min: { x: -10.5, z: -10.5 }, max: { x: -8.5, z: 10.5 } }, // Pared izquierda (más margen)
        { min: { x: 8.5, z: -10.5 }, max: { x: 10.5, z: 10.5 } }    // Pared derecha (más margen)
    ];

    for (let wall of wallBounds) {
        if (position.x >= wall.min.x - collisionMargin && position.x <= wall.max.x + collisionMargin &&
            position.z >= wall.min.z - collisionMargin && position.z <= wall.max.z + collisionMargin) {
            return true;
        }
    }

    return false;
}

// Loop de animación
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (controls.isLocked) {
        const moveSpeed = 8.0; // Velocidad ajustada para mejor control

        // Aplicar fricción para movimiento más suave
        velocity.x -= velocity.x * 8.0 * delta;
        velocity.z -= velocity.z * 8.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        // Guardar posición anterior
        const previousPosition = camera.position.clone();

        if (moveForward || moveBackward) {
            velocity.z -= direction.z * moveSpeed * delta;
        }
        if (moveLeft || moveRight) {
            velocity.x -= direction.x * moveSpeed * delta;
        }

        // Aplicar movimiento
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // Verificar colisiones y revertir si hay colisión
        if (checkCollision(camera.position)) {
            camera.position.copy(previousPosition);
            // Detener la velocidad para evitar acumulación
            velocity.x = 0;
            velocity.z = 0;
        }

        // Mantener la cámara a una altura constante (a nivel de las obras)
        camera.position.y = 4;
    }

    // Render de la escena
    renderer.render(scene, camera);
}

animate();
