const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CORS = require('cors');

const usersRouter = require('./api/routes/user/user');
const userSettingsRouter = require('./api/routes/user/userSettings');
const doctorsRouter = require('./api/routes/doctors');
const patientsRouter = require('./api/routes/patients');
const apointmentsRouter = require('./api/routes/appointments');
const configuration = require('./config/configuration');
const authRouter = require('./api/routes/auth');
const externalAPIRouter = require('./api/routes/externalAPI');
const isAuth = require('./middleware/is-auth');

const app = express();
const PORT = 3000;

mongoose.connect(configuration.DB_CONECTION_STRING, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow CORS
app.use(CORS());

app.use('/users', isAuth, usersRouter);
app.use('/userSettings', isAuth, userSettingsRouter);
app.use('/appointments', isAuth, apointmentsRouter);
app.use('/doctors', isAuth, doctorsRouter);
app.use('/patients', isAuth, patientsRouter);
app.use('/auth', authRouter);
app.use('/external-api', externalAPIRouter);

// handle all errors
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({
        message: error.message,
        data: error.data
    });
});


app.listen(PORT);