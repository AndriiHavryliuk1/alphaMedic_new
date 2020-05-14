const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CORS = require('cors');

const usersRouter = require('./api/routes/user/user');
const userSettingsRouter = require('./api/routes/user/userSettings');
const doctorsRouter = require('./api/routes/doctors');
const patientsRouter = require('./api/routes/user/patients');
const apointmentsRouter = require('./api/routes/appointments');
const configuration = require('./config/configuration');
const authRouter = require('./api/routes/auth');
const externalAPIRouter = require('./api/routes/externalAPI');
const servicesRouter = require('./api/routes/services');
const teethRouter = require('./api/routes/teeth');
const diagnosisRouter = require('./api/routes/diagnosis');
const teethFormulaRouter = require('./api/routes/teethFormula');

const isAuth = require('./middleware/is-auth');
const dbGenerator = require('./services/dbGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use('/services', isAuth, servicesRouter);
app.use('/teeth', isAuth, teethRouter);
app.use('/diagnosis', isAuth, diagnosisRouter);
app.use('/auth', authRouter);
app.use('/external-api', externalAPIRouter);
app.use('/teethFormula', teethFormulaRouter);

// handle all errors
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({
        message: error.message,
        data: error.data
    });
});

dbGenerator.generateDb();

app.listen(PORT);
