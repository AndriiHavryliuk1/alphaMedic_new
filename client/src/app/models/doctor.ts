export class Doctor {
    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;
    public schedule: {};
    public lastModificationUser: string;

    constructor(id, name, surname, email, password, schedule, lastModificationUser) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.schedule = schedule;
        this.lastModificationUser = lastModificationUser;
    }
}
