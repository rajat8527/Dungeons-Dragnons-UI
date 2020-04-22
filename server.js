const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
var cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
var whitelist = ['https://rakuten-dnd-character-app.herokuapp.com/api/getCharacterData','https://rakuten-dnd-character-app.herokuapp.com/api/saveCharacterData', 'https://rakuten-dnd-character-app.herokuapp.com/api/deleteAllData']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);