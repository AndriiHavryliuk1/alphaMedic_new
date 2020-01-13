import * as jwt_decode from 'jwt-decode';

export class User {
  private readonly expirationDate: Date;

  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private imageSrc: string;
  private birthday: Date;
  private type: string;
  private gender: 'MALE' | 'FEMALE';
  private roles: string[];

  constructor(user,
              private token) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.imageSrc = user.imageSrc;
    this.birthday = user.birthday;
    this.type = user.type;
    this.gender = user.gender;
    this.roles = user.rules;
    if (token) {
      const decoded = jwt_decode(token);
      this.expirationDate = new Date(decoded.exp * 1000);
    }
  }

  /**
   * Getter for token
   */
  public getToken() {
    if (new Date() <= this.expirationDate) {
      return this.token;
    }
    return null;
  }

  /**
   * Getter for id property
   */
  public getId() {
    return this.id;
  }

  /**
   * Getter for firstName property
   */
  public getFirstName() {
    return this.firstName;
  }

  /**
   * Getter for lastName property
   */
  public getLastName() {
    return this.lastName;
  }

  /**
   * Getter for email property
   */
  public getEmail() {
    return this.email;
  }

  /**
   * Getter for roles property
   */
  public getRoles() {
    return this.roles;
  }

  /**
   * Getter for type property
   */
  public getType() {
    return this.type;
  }
}
