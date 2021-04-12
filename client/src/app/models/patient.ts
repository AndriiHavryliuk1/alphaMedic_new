export class Patient {
  public id: string;
  public name: string;
  public surname: string;
  public email: string;
  public fullName: string;
  public fatherName: string;
  public imageSrc: any;
  public birthday: Date;
  public doctor: {
    name: string;
    surname: string;
    id: string;
  };
  public medicalCard: object;
  public type: string;
  public gender: 'MALE' | 'FEMALE';
  public phoneNumbers: string[] = [];

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.fullName = this.surname + ' ' + this.name;
    this.fatherName = user.fatherName;
    this.imageSrc = user.imageSrc;
    this.birthday = user.birthday;
    this.type = user.type;
    this.gender = user.gender;
    this.doctor = user.doctor;
    this.medicalCard = user.medicalCard;
    if (user.phoneNumbers) {
      this.phoneNumbers = user.phoneNumbers;
    } else {
      if (user.firstPhoneNumber) {
        this.phoneNumbers.push(user.firstPhoneNumber);
      } else if (user.secondPhoneNumber) {
        this.phoneNumbers.push(user.secondPhoneNumber);
      }
    }
  }
}
