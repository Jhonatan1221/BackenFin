const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Permite solicitudes desde el frontend y backend locales
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Habilita cookies y autenticación cruzada
  })
);

// Configuración de COOP y COEP
// Relajado para evitar bloqueos durante el desarrollo
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none"); // Relajado para evitar bloqueos de COOP
  next();
});

// Middleware para analizar JSON
app.use(express.json());

// Rutas principales
app.use("/api", userRouter);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
