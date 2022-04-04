const express = require('express');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here

app.listen(port);

app.use(helmet({
  // disable these to get the autocomplete to work
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,

  // other headers
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  contentSecurityPolicy: false
}));
app.use(express.static('public'))

console.log('Server started at http://localhost:' + port);
