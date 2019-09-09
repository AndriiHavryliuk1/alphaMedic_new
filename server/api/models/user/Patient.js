const AbstractUser = require("./abstractUser");


class Patient extends AbstractUser {
    constructor(patient) {
        this.super(patient);
        this.medicalHistory = patient.medicalHistory;
    }

}