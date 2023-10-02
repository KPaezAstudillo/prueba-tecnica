const mongoose = require('mongoose');

//Esquema de datos
const testSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, 
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
  aviso: {
    type: String,
    required: true,
  },
  tituloImagen: {
    type: String,
    required: true,
  },
  imagenes: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

//Modelo creado a partir del esquema
const TestModel = mongoose.model('Test', testSchema);

module.exports = TestModel;
