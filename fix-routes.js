const fs = require('fs');
const path = require('path');

// Directorio de salida
const outDir = path.join(__dirname, 'out');

// Función para reemplazar rutas absolutas con relativas
function fixRoutesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Reemplazar TODAS las rutas absolutas con relativas
  content = content.replace(/href="\/_next\//g, 'href="./_next/');
  content = content.replace(/src="\/_next\//g, 'src="./_next/');
  content = content.replace(/href="\/manifest\.json"/g, 'href="./manifest.json"');
  content = content.replace(/href="\/icon-192x192\.png"/g, 'href="./icon-192x192.png"');
  content = content.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');
  
  fs.writeFileSync(filePath, content);
}

// Función recursiva para procesar todos los archivos HTML
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      console.log('Procesando:', filePath);
      fixRoutesInFile(filePath);
    }
  });
}

// Ejecutar
console.log('Corrigiendo TODAS las rutas en la carpeta out...');
processDirectory(outDir);
console.log('¡Rutas corregidas completamente!');