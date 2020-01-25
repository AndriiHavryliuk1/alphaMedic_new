const AbstractUser = require("./abstractUser");

class Patient extends AbstractUser {
    constructor(patient) {
        super(patient);
        this.medicalCard = patient.medicalCard;
        this.doctor = patient.doctor;
        this.phoneNumbers = patient.phoneNumbers;
        this.address = patient.address;
        this.workPlace = patient.workPlace;
    }

}

module.exports = Patient;