const AbstractUser = require("./abstractUser");


class Doctor extends AbstractUser {
    constructor(doctor) {
        this.super(doctor);
        this.education = doctor.education;
        this.schedule = doctor.schedule;
    }

}