const net = require('net');

// Configuration du serveur SMTP
const SMTP_HOST = 'localhost'; // Remplacez localhost par l'adresse IP ou le nom d'hôte de votre serveur SMTP
const SMTP_PORT = 25;

// Création du socket pour se connecter au serveur SMTP
const client = net.createConnection({ host: SMTP_HOST, port: SMTP_PORT }, () => {
  console.log('Connecté au serveur SMTP');

  // Envoi des commandes SMTP pour envoyer un e-mail
  client.write('EHLO localhost\r\n');
  client.write('MAIL FROM: <test@example.com>\r\n');
  client.write('RCPT TO: <djellal.aminepro@gmail.com>\r\n');
  client.write('DATA\r\n');
  client.write('Subject: Test SMTP\r\n');
  client.write('From: <from@example.com>\r\n');
  client.write('To: <test@gmail.com>\r\n');
  client.write('\r\n');
  client.write('Ceci est un test SMTP\r\n');
  client.write('.\r\n'); // Marque la fin des données
  client.write('QUIT\r\n');
});

// Affichage des messages reçus du serveur SMTP
client.on('data', (data) => {
  console.log('Reçu:', data.toString());
});

// Gestion des erreurs de connexion
client.on('error', (err) => {
  console.error('Erreur de connexion au serveur SMTP:', err);
});

// Fin de la connexion
client.on('end', () => {
  console.log('Déconnexion du serveur SMTP');
});
