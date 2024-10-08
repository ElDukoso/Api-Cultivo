require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const {dbConnection} =  require('./database/config');
dbConnection();

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/crops', require('./routes/crop.routes'));
app.use('/api/kits', require('./routes/kit.routes'));
app.use('/api/parameters', require('./routes/parameter.routes'));
app.use('/api/sensor', require('./routes/sensor.routes'));
app.use('/api/sensorReading', require('./routes/sensorReading.routes'));



app.listen(process.env.PORT, () => {
    console.log('El servidor esta corriendo en el puerto ' + process.env.PORT)
});