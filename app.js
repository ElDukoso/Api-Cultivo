require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const {dbConnection} =  require('./database/config');
dbConnection();

app.listen(process.env.PORT, () => {
    console.log('El servidor esta corriendo en el puerto ' + process.env.PORT)
});