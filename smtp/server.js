const net = require('net');

// Création du serveur SMTP
const server = net.createServer((socket) => {
  socket.write('SMTP WELCOME BACK TO YOU DEAR ADMIN SYS\r\n'); // Message de bienvenue

  // Gestion des commandes SMTP
  socket.on('data', (data) => {
    const command = data.toString().trim();
    console.log('Command received:', command);

    // Exemple de réponse pour la commande EHLO
    if (command.startsWith('EHLO')) {
      socket.write('250-localhost Hello localhost\r\n');
      socket.write('250-SIZE 10240000\r\n');
      //socket.write('250 AUTH LOGIN PLAIN\r\n');
    }
    // Exemple de réponse pour la commande MAIL FROM
    else if (command.startsWith('MAIL FROM')) {
      socket.write('250 OK\r\n');
    }
    // Exemple de réponse pour la commande RCPT TO
    else if (command.startsWith('RCPT TO')) {
      socket.write('250 OK\r\n');
    }
    // Exemple de réponse pour la commande DATA
    else if (command === 'DATA') {
      socket.write('354 Start mail input; end with <CRLF>.<CRLF>\r\n');
    }
    // Exemple de réponse pour la commande QUIT
    else if (command === 'QUIT') {
      socket.write('221 Bye\r\n');
      socket.end();
    }
    // Réponse par défaut pour les commandes non reconnues
    else {
      socket.write('500 Syntax error, command unrecognized\r\n');
    }
  });
});

// Gestion des erreurs du serveur
server.on('error', (err) => {
  console.error('Erreur du serveur:', err);
});

// Démarrage du serveur SMTP sur le port 25
server.listen(25, () => {
  console.log('Serveur SMTP en cours d\'exécution sur le port 25');
});
