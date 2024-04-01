
export class UserModel {
  public id: number;
  public username: string;
  registrationInstant: string;

  public constructor(
    fields?: {
      id?:number,
      username?: string,
      registrationInstant?: string
    }) {
    if (fields) {
     // this.id = fields.id || this.id;
      this.username = fields.username || this.username;
      this.registrationInstant = fields.registrationInstant || this.registrationInstant;
    }
  }
}

