export class User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  created_at: string;

  constructor({
    id,
    email,
    firstname,
    lastname,
    phonenumber,
    created_at,
  }: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    created_at: string;
  }) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.created_at = created_at;
  }
}
