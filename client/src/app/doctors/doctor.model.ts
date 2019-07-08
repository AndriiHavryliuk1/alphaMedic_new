export class Doctor {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public schedule: {};
    public lastModificationUser: string;
    
    constructor(id, firstName, lastName, email, password, schedule, lastModificationUser) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.schedule = schedule;
        this.lastModificationUser = lastModificationUser;
    }
}