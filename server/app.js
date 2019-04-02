const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CORS = require('cors');

const usersRouter = require('./api/routes/user');
const apointmentsRouter = require('./api/routes/appointments');
const configuration = require('./config/configuration');

const app = express();
const PORT = 3000;

mongoose.connect(configuration.DB_CONECTION_STRING, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow CORS
app.use(CORS());

app.use('/users', usersRouter);
app.use('/appointments', apointmentsRouter);

// handle all errors
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({
        message: error.message,
        data: error.data
    });
});


app.listen(PORT);