const express = require('express');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here

app.listen(port);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));
app.use(express.static('public'))

console.log('Server started at http://localhost:' + port);
