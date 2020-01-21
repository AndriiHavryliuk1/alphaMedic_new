const AbstractUser = require("./abstractUser");

class Patient extends AbstractUser {
    constructor(patient) {
        super(patient);
        this.medicalCard = patient.medicalCard;
    }

}

module.exports = Patient;