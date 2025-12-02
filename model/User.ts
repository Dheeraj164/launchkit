export class User {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;

  constructor({
    email,
    firstname,
    lastname,
    phonenumber,
  }: {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
  }) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
  }
}
