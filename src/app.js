const express = require('express');
const app = express();

// Importar rutas
const roleRoute = require('./routes/roleRoute');
// Aquí puedes importar otras rutas según sea necesario

// Middleware y configuraciones
app.use(express.json());

// Usar las rutas en la aplicación
app.use('/roles', roleRoute);     // Usar /roles para las rutas relacionadas con roles
// Puedes agregar más rutas aquí según sea necesario

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
