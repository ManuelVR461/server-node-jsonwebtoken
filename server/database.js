const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Base de Datos Conectado');
});


module.exports = mongoose;