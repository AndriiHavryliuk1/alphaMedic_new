class AbstractUser {
    constructor(user) {
        this._id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.imageURL = user.imageUrl;
        this.birthday = user.birthday;
        this.type = user.type;
        this.gender = user.gender;
        this.roles = user.roles;
        this.active = user.active
        this.lastModificationUser = user.lastModificationUser;
        this.lastModificationTime = user.lastModificationTime;
    }
}

export { AbstractUser as default}