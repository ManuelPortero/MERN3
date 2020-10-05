const morgan = require ('morgan'); 
const express = require ('express');// requiero express
const app = express(); //ejecuto express y lo guardo en constante app 
const path = require('path');
const {mongoose} = require('./database');
const Task = require ('./models/task'); 
const router = require('./routes/tasks.routes');
// Settings

app.set('port', process.env.PORT || 3000); //asignamos el puerto

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); 
// Routes 
app.use('/api/tasks',require ('./routes/tasks.routes'));
app.use('/api/employees',require ('./routes/employee.routes'));
app.use('/api/customers',require ('./routes/customer.routes'));
// Static files
//app.use(express.static());
app.use(express.static(path.join(__dirname,'public')));

//Pongo a escuchar al server en el puerto 3000
//Starting the server
app.listen(app.get('port'),()=> {
    console.log(`Server on port ${app.get('port')}`); 
});
