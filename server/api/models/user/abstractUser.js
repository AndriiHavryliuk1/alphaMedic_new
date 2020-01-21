class AbstractUser {
    constructor(user) {
        this._id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.imageURL = user.imageUrl;
        this.birthday = user.birthday;
        this.gender = user.gender;
        this.role = user.role;
        this.active = user.active;
        this.lastModificationUser = user.lastModificationUser;
    }
}

module.exports = AbstractUser;
