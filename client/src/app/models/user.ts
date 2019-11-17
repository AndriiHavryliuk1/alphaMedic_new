export class User {
  private expirationDate: Data;

  constructor(private _id,
              private firstName,
              private lastName,
              private email,
              private imageSrc,
              private birthday,
              private type,
              private gender,
              private roles,
              private token
  ) {

  }

  get token() {
    return this.token
  }
}
