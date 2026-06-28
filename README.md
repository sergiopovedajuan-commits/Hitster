# 🎵 Cronotrack

Juego musical tipo Hitster (2000-2026) para jugar con amigos. Una sola página
web, sin frameworks, con audio real vía iTunes Search API y un servidor Node
mínimo (sin dependencias externas) para poder desplegarlo online.

## Estructura del proyecto

```
cronotrack/
├── public/
│   └── index.html     ← el juego completo (HTML + CSS + JS)
├── server.js           ← servidor estático (solo módulos nativos de Node)
├── package.json
├── railway.json
└── .gitignore
```

No hay dependencias externas (`package.json` no instala nada), así que no hay
nada que pueda fallar al instalar paquetes.

---

## 1. Subir a GitHub

Desde la carpeta `cronotrack/`:

```bash
git init
git add .
git commit -m "Cronotrack: primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cronotrack.git
git push -u origin main
```

(Sustituye `TU-USUARIO` y crea antes el repositorio vacío en GitHub si no
existe — sin añadir README, .gitignore ni licencia desde la web, para evitar
conflictos al hacer push.)

## 2. Desplegar en Railway

1. Entra en [railway.app](https://railway.app) e inicia sesión con tu cuenta
   de GitHub.
2. **New Project → Deploy from GitHub repo** → selecciona el repositorio
   `cronotrack` que acabas de subir.
3. Railway detecta automáticamente que es un proyecto Node.js (por
   `package.json`) y ejecuta `npm install` + `npm start` solo. No hace falta
   tocar nada más — `railway.json` ya fija el comando de arranque por si
   acaso.
4. Railway asigna automáticamente la variable de entorno `PORT`; el
   `server.js` ya la usa (`process.env.PORT`), así que no hay que configurar
   nada manualmente.
5. Cuando termine el deploy, pulsa **"Generate Domain"** dentro de la pestaña
   *Settings → Networking* para obtener una URL pública tipo
   `https://cronotrack-production.up.railway.app`.

Listo: comparte esa URL con tus amigos y jugáis todos desde el móvil sin
instalar nada.

## 3. Probarlo en local antes de subirlo (opcional)

```bash
node server.js
```

Y abre `http://localhost:3000` en el navegador. Al ser un servidor real
(no `file://`), el audio de iTunes funcionará sin los problemas de CORS que
aparecen al abrir el HTML con doble clic.

## Notas

- El dataset de canciones (título/artista/año) está embebido directamente
  dentro de `public/index.html`, en el array `const SONGS = [...]`. Para
  añadir más canciones, edita ese archivo directamente y vuelve a hacer
  `git push` — Railway redesplegará solo con cada push a `main`.
- El audio real se busca en tiempo real contra la iTunes Search API
  (gratuita, sin clave). Si alguna canción no tiene preview disponible, el
  juego sigue funcionando igual, solo sin sonido para esa carta.
