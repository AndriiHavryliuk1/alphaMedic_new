const AbstractUser = require("./abstractUser");

class Patient extends AbstractUser {
    constructor(patient) {
        super(patient);
        this.medicalHistory = patient.medicalHistory;
    }

}

module.exports = Patient;