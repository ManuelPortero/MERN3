const mongoose = require ('mongoose'); 
const URI = 'mongodb://localhost/ejercicio-rutas';

mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology:true}).then(db => console.log('Db conectada!'))
.catch(err=> console.log(err));

module.exports = mongoose; 