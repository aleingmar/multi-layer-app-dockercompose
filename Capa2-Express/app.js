const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Usar la variable de entorno definida en docker-compose
const MONGO_URL = process.env.MONGO_URL || "mongodb://capa3-mongo:27017/miapp";

// Middleware
app.use(cors());
app.use(express.json());

// Variable para comprobar estado de conexión
let dbConnected = false;

// Función de conexión con reintentos
async function connectToMongoDB() {
    console.log("⏳ Intentando conectar a MongoDB...");
    try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // pequeña espera
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Conexión exitosa a MongoDB.");
        dbConnected = true;
    } catch (err) {
        console.error("❌ Error al conectar a MongoDB:", err.message);
        dbConnected = false;

        console.log("🔁 Reintentando en 5 segundos...");
        await new Promise(resolve => setTimeout(resolve, 5000));
        return connectToMongoDB();
    }
}

// Eventos de mongoose para depuración
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose está conectado a MongoDB.');
});
mongoose.connection.on('error', (err) => {
    console.error('🔴 Error en la conexión de Mongoose:', err.message);
});
mongoose.connection.on('disconnected', () => {
    console.log('🟡 Mongoose está desconectado.');
});

// Iniciar conexión
connectToMongoDB();

// Ruta de prueba
app.get('/api/saludo', (req, res) => {
    if (dbConnected) {
        res.json({ mensaje: 'Hola desde Express y conectado a MongoDB ✅' });
    } else {
        res.json({ mensaje: 'Hola desde Express pero sin conexión a MongoDB ❌' });
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
