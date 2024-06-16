const express = require('express');
const app = express();
const sequelize = require('./config/database'); // Asegúrate de importar tu configuración de base de datos

// Importar rutas
const roleRoute = require('./routes/roleRoute');
const userRoute = require('./routes/userRoute');
const specialtyRoute = require('./routes/specialtyRoute');
const doctorRoute = require('./routes/doctorRoute');
const patientRoute = require('./routes/patientRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const historyRoute = require('./routes/historyRoute');
// Aquí puedes importar otras rutas según sea necesario

// Middleware y configuraciones
app.use(express.json());

// Usar las rutas en la aplicación
app.use('/roles', roleRoute); // Usar /roles para las rutas relacionadas con roles
app.use('/users', userRoute); // Usar /users para las rutas relacionadas con usuarios
app.use('/specialties', specialtyRoute); // Usar /specialties para las rutas relacionadas con especialidades
app.use('/doctors', doctorRoute); // Usar /doctors para las rutas relacionadas con doctores
app.use('/patients', patientRoute); // Usar /patients para las rutas relacionadas con pacientes
app.use('/appointments', appointmentRoute); // Usar /appointments para las rutas relacionadas con citas
app.use('/histories', historyRoute); // Usar /histories para las rutas relacionadas con historiales
// Puedes agregar más rutas aquí según sea necesario

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
