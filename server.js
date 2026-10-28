/**
 * ==============================================================================
 * Serveur Personnalisé Next.js pour Hébergement cPanel / Phusion Passenger
 * ==============================================================================
 * 
 * Sur un hébergement cPanel (via l'outil "Setup Node.js App"), Phusion Passenger
 * cherche un fichier de démarrage (généralement `server.js` ou `app.js`).
 * 
 * Ce script initialise Next.js en mode production et route toutes les requêtes
 * HTTP vers le moteur Next.js (.next).
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Toujours en mode production sur le serveur cPanel
const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialisation de l'application Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Erreur de traitement:', req.url, err);
        res.statusCode = 500;
        res.end('Erreur interne du serveur');
      }
    }).listen(port, () => {
      console.log(`> Prêt sur http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors du démarrage du serveur Next.js:', err);
    process.exit(1);
  });
