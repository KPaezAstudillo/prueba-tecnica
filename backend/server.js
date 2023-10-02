const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const testRoutes = require('./routes/test'); 
const testModel = require('./models/test'); 
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:3001' }));

mongoose.connect('mongodb://localhost:27017/prueba_tecnica', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use(bodyParser.json());

app.use('/api/test', testRoutes(testModel)); // Pasé el modelo como argumento a las rutas

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
