import * as jwt_decode from 'jwt-decode';

export class User {
  private expirationDate: Date;

  constructor(private _id,
              private firstName,
              private lastName,
              private email,
              private imageSrc,
              private birthday,
              private type,
              private gender,
              private roles,
              private _token) {
    if (_token) {
      const decoded = jwt_decode(_token);
      this.expirationDate = new Date(decoded.exp * 1000);
    }
  }

  get token() {
    if (new Date() <= this.expirationDate) {
      return this._token;
    }
    return null;
  }
}
