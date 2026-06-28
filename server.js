// Servidor estático mínimo para Cronotrack — SIN dependencias externas.
// Usa solo módulos nativos de Node (http, fs, path), así que no hay nada
// que instalar ni que pueda fallar al hacer `npm install` en Railway.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const INDEX_FILE = path.join(PUBLIC_DIR, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function sendFile(filePath, res){
  fs.readFile(filePath, (err, data) => {
    if(err){
      sendIndex(res);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function sendIndex(res){
  fs.readFile(INDEX_FILE, (err, data) => {
    if(err){
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error interno del servidor: no se encontró index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME_TYPES['.html'] });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const requestedPath = urlPath === '/' ? '/index.html' : urlPath;

  let filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  // Evita salir del directorio /public (path traversal) con rutas tipo "../../".
  if(!filePath.startsWith(PUBLIC_DIR)){
    sendIndex(res);
    return;
  }

  sendFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Cronotrack escuchando en el puerto ${PORT}`);
});
