const AbstractUser = require("./abstractUser");

module.exports = class Doctor extends AbstractUser {
    constructor(doctor) {
        super(doctor);
        this.education = doctor.education;
        this.schedule = doctor.schedule;
    }

}