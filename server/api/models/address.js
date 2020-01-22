class Address {
    constructor(address) {
        if (address._id) {
            this._id = address._id;
        }
        this.country = address.country;
        this.region = address.region;
        this.city = address.city;
        this.street = address.street;
        this.streetNumber = address.streetNumber;
    }
}

module.exports = Address;
