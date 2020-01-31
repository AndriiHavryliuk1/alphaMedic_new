import * as jwt_decode from 'jwt-decode';

export class User {
  private readonly expirationDate: Date;

  private id: string;
  private name: string;
  private surname: string;
  private fatherName: string;
  private fullName: string;
  private email: string;
  private imageSrc: string;
  private birthday: Date;
  private type: string;
  private gender: 'MALE' | 'FEMALE';
  private roles: string[];

  constructor(user,
              private token) {
    if (!user) {
      return;
    }
    this.id = user._id;
    this.name = user.name;
    this.surname = user.surname;
    this.fullName = this.surname + ' ' + this.name;
    this.fatherName = user.fatherName;
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
   * Getter for name property
   */
  public getFirstName() {
    return this.name;
  }

  /**
   * Getter for surname property
   */
  public getLastName() {
    return this.surname;
  }

  /**
   * Getter for name property
   */
  public getFullName() {
    return this.fullName;
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
