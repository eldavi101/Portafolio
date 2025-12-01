# Cómo Agregar Nuevos Trabajos a la Galería

## Pasos para agregar un nuevo trabajo:

### 1. Colocar el archivo en la carpeta correspondiente
- **Quinces**: Coloca el archivo en la carpeta `Quinces/`
- **Bodas**: Coloca el archivo en la carpeta `Bodas/`
- **Baby Showers**: Coloca el archivo en la carpeta `Baby Showers/`
- **Graduaciones**: Coloca el archivo en la carpeta `Graduaciones/`

### 2. Actualizar el archivo `portfolio-data.json`

Abre el archivo `portfolio-data.json` y agrega un nuevo objeto en la categoría correspondiente.

#### Para IMÁGENES (JPG, PNG, GIF):
```json
{
  "title": "Nombre de la invitación",
  "type": "image",
  "path": "Quinces/nombre-archivo.jpg",
  "description": "Descripción breve del trabajo"
}
```

#### Para VIDEOS (MP4, MOV):
```json
{
  "title": "Nombre del video",
  "type": "video",
  "path": "Quinces/nombre-video.mp4",
  "description": "Descripción del video",
  "thumbnail": "Quinces/miniatura.jpg"
}
```

#### Para PDFs:
```json
{
  "title": "Nombre del PDF",
  "type": "pdf",
  "path": "Quinces/invitacion.pdf",
  "description": "Descripción del documento"
}
```

#### Para ENLACES (Sitios web, páginas externas):
```json
{
  "title": "Nombre del sitio",
  "type": "link",
  "path": "https://ejemplo.com/invitacion",
  "description": "Descripción del enlace"
}
```

### 3. Ejemplo completo

Si quieres agregar 2 imágenes a Quinces y 1 video a Bodas, el archivo `portfolio-data.json` quedaría así:

```json
{
  "quinces": [
    {
      "title": "Invitación Rosa Dorado",
      "type": "image",
      "path": "Quinces/rosa-dorado.jpg",
      "description": "Diseño elegante con detalles dorados"
    },
    {
      "title": "Invitación Mariposas",
      "type": "image",
      "path": "Quinces/mariposas.png",
      "description": "Tema de mariposas y flores"
    }
  ],
  "bodas": [
    {
      "title": "Video Boda Romántica",
      "type": "video",
      "path": "Bodas/romantica.mp4",
      "description": "Video invitación con música romántica"
    }
  ],
  "baby": [],
  "graduaciones": []
}
```

### 4. Guardar y subir cambios

Después de actualizar el archivo JSON:
```bash
git add .
git commit -m "Agregar nuevos trabajos a la galería"
git push
```

## Notas importantes:
- Asegúrate de que el nombre del archivo en `"path"` coincida exactamente con el nombre real del archivo
- Usa comillas dobles (`"`) en el JSON, no comillas simples
- Cada objeto dentro de una categoría debe estar separado por comas
- Las rutas deben incluir la carpeta: `Quinces/archivo.jpg`, no solo `archivo.jpg`
