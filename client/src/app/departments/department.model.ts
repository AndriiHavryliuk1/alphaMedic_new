import {Doctor} from "../doctors/doctor.model";

export class Department {
    public id: string;
    public name: string;
    public description: string;
    public departmentHead: {};
    public doctors: Doctor[];
    public lastModificationUser: string;

    constructor(id, name, description, departmentHead, doctors, lastModificationUser) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.departmentHead = departmentHead;
        this.doctors = doctors;
        this.lastModificationUser = lastModificationUser;
    }
}