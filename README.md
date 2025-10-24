# 🎨 Art Gallery 3D

Una galería de arte interactiva en 3D construida con Three.js que permite a los usuarios explorar obras de arte en un entorno virtual inmersivo.

## 📋 Descripción

Este proyecto es una galería de arte virtual donde los usuarios pueden caminar libremente y explorar diferentes obras de arte expuestas en las paredes. La experiencia utiliza controles estilo FPS (First Person Shooter) para proporcionar una navegación intuitiva y natural.

## ✨ Características

- **Navegación en primera persona**: Controles FPS suaves para explorar la galería
- **Iluminación realista**: Sistema de iluminación profesional con luces ambientales, direccionales y puntuales para resaltar cada obra
- **Sistema de colisiones**: Evita que el usuario atraviese paredes y objetos
- **Información interactiva**: Haz clic en cualquier pintura para ver información detallada (título, artista, año, descripción)
- **Elementos decorativos**: Esculturas y objetos 3D que añaden profundidad a la galería
- **Responsive**: Se adapta automáticamente al tamaño de la ventana

## 🎮 Controles

| Tecla/Acción | Función |
|--------------|---------|
| **W** / **↑** | Mover hacia adelante |
| **S** / **↓** | Mover hacia atrás |
| **A** / **←** | Mover a la izquierda |
| **D** / **→** | Mover a la derecha |
| **Mouse** | Mirar alrededor |
| **Click** | Ver información de la pintura |
| **ESC** | Liberar el cursor del mouse |

## 🛠️ Tecnologías Utilizadas

- **Three.js** (v0.170.0) - Librería de gráficos 3D
- **Vite** (v5.4.10) - Build tool y servidor de desarrollo
- **JavaScript (ES6+)** - Lenguaje de programación
- **HTML5 & CSS3** - Estructura y estilos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd art-gallery/GalleryThreeJs-main
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npx vite
```

4. Abre tu navegador en `http://localhost:5173` (o el puerto que indique Vite)

## 📁 Estructura del Proyecto

```
GalleryThreeJs-main/
├── js/
│   └── main.js          # Lógica principal de la aplicación
├── public/
│   └── artworks/        # Imágenes de las obras de arte
│       ├── 0.jpg
│       ├── 01.jpg
│       ├── 02.jpg
│       └── 03.jpg
├── css/                 # Estilos (si los hay)
├── index.html           # Página principal
├── package.json         # Dependencias del proyecto
└── README.md           # Este archivo
```

## 🎨 Agregar Nuevas Obras

Para agregar nuevas obras de arte a la galería:

1. Coloca la imagen en `public/artworks/`
2. En `js/main.js`, usa la función `createPainting()`:

```javascript
createPainting(
    ancho,              // Ancho del cuadro
    alto,               // Alto del cuadro
    '/artworks/tu-imagen.jpg',  // Ruta de la imagen
    x,                  // Posición X
    y,                  // Posición Y (altura)
    z,                  // Posición Z (profundidad)
    rotacionY,          // Rotación (0, Math.PI/2, -Math.PI/2, Math.PI)
    {
        title: 'Título de la Obra',
        artist: 'Nombre del Artista',
        description: 'Descripción de la obra',
        year: '2024'
    }
);
```

## 🌟 Características Técnicas

### Sistema de Iluminación
- **Luz ambiental**: Iluminación base uniforme (0.6 de intensidad)
- **Luz hemisférica**: Simula la luz natural del cielo y el suelo
- **Luz direccional**: Luz principal con sombras
- **Luces puntuales**: Una por cada obra para resaltarlas
- **SpotLights**: Luces focalizadas para acentuar las pinturas

### Sistema de Colisiones
- Detección de colisiones con paredes
- Margen de seguridad para evitar que el usuario se quede atrapado
- Reversión de posición suave al detectar colisión

### Optimizaciones
- Sombras suaves con PCFSoftShadowMap
- Antialiasing habilitado
- Texturas optimizadas
- Renderizado eficiente

## 🚀 Producción

Para crear una versión de producción:

```bash
npx vite build
```

Los archivos optimizados se generarán en la carpeta `dist/`.



## 👨‍💻 Autor

Desarrollado como parte de las Prácticas Profesionales III

## 🙏 Agradecimientos

- Three.js por su excelente documentación
- La comunidad de desarrolladores 3D web

---

**Nota**: Este proyecto está en desarrollo activo. Algunas áreas de la galería muestran placeholders "PRÓXIMAMENTE" donde se agregarán futuras obras de arte.
