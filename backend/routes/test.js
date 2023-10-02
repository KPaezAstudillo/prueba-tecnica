const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // O la configuración que desees
const upload = multer({ storage: storage });


module.exports = (Test) => {
  // Ruta GET
  router.get("/", async (req, res) => {
    try {
      const productos = await Test.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el nuevo documento: " + error.message });
    }
  });

  // Ruta GET para obtener detalles de un solo registro
  router.get("/detalles/:id", async (req, res) => {
    try {
      const producto = await Test.findById(req.params.id);

      if (!producto) {
        return res.status(404).json({ error: "Registro no encontrado." });
      }

      res.json(producto);
    } catch (error) {
      console.error("Error al obtener los detalles del registro:", error);
      res.status(500).json({ error: "Error al obtener los detalles del registro." });
    }
  });


  // Ruta POST
  router.post("/", upload.single("imagen"), async (req, res) => {
    try {
      const { nombre, categoria, precio, aviso, tituloImagen } = req.body;


      const imagen = req.file;

      // Crea un nuevo documento Test con los datos y la imagen
      const newTest = new Test({
        nombre,
        categoria,
        precio,
        aviso,
        tituloImagen,
        imagenes: [
          {
            data: imagen.buffer,
            contentType: imagen.mimetype,
          },
        ],
      });

      await newTest.save();
      res.status(201).json(newTest);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el nuevo documento." });
    }
  });

  // Ruta DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const deletedTest = await Test.findByIdAndRemove(req.params.id);
      if (!deletedTest) {
        return res.status(404).json({ error: "Documento no encontrado." });
      }
      res.json(deletedTest);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el documento." });
    }
  });


  return router;
};
