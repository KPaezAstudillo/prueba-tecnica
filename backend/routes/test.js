const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (Test) => {
  // Ruta GET
  router.get("/", async (req, res) => {
    try {
      const productos = await Test.find();
      res.json(productos);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el nuevo documento: " + error.message });
    }
  });

  // Ruta GET de un solo registro
  router.get("/detalles/:id", async (req, res) => {
    try {
      const producto = await Test.findById(req.params.id);

      if (!producto) {
        return res.status(404).json({ error: "Registro no encontrado." });
      }

      res.json(producto);
    } catch (error) {
      console.error("Error al obtener los detalles del registro:", error);
      res
        .status(500)
        .json({ error: "Error al obtener los detalles del registro." });
    }
  });

  // Ruta POST
  router.post("/", upload.array("imagen", 4), async (req, res) => {
    try {
      const { nombre, categoria, precio, aviso, tituloImagen } = req.body;

      const imagenes = req.files;

      // Crea un nuevo documento Test con los datos y las imágenes
      const newTest = new Test({
        nombre,
        categoria,
        precio,
        aviso,
        tituloImagen,
        imagenes: imagenes.map((imagen) => ({
          data: imagen.buffer,
          contentType: imagen.mimetype,
        })),
      });

      // Validaciones
      if (!nombre || nombre.length < 4 || nombre.length > 25) {
        return res
          .status(400)
          .json({ error: "El nombre debe tener entre 4 y 25 caracteres." });
      }

      if (!["Entretención", "Videojuegos", "Smart home"].includes(categoria)) {
        return res.status(400).json({ error: "La categoría no es válida." });
      }

      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum < 0 || precioNum > 2000000) {
        return res
          .status(400)
          .json({ error: "El precio debe ser un número entre 0 y 2.000.000." });
      }

      if (!["Destacado", "Normal"].includes(aviso)) {
        return res
          .status(400)
          .json({ error: "El tipo de aviso no es válido." });
      }

      const tituloValido = /^[a-zA-Z\s]{5,30}$/.test(tituloImagen);
      if (!tituloValido) {
        return res
          .status(400)
          .json({
            error:
              "El título debe tener entre 5 y 30 caracteres y solo contener texto y espacios.",
          });
      }

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: "Debe subir al menos una imagen." });
      }

      for (const imagen of req.files) {
        if (!["image/jpeg", "image/png"].includes(imagen.mimetype)) {
          return res
            .status(400)
            .json({
              error: "Formato de imagen no válido. Solo se permite jpg y png.",
            });
        }
      }
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
