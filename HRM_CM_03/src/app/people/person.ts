/*export interface Person{
    id: number;
    name: string;
    weight: number;
    height: number;
    // it is optional because I know it
    // doesn't exist in the API that we will
    // consume in the next exercise :)
    profession?: string;
}*/

export class Person {
  public id: number = 0;
  public name: string = "default"
  public address: string = "default"
  public age: number = 0;

  public constructor(
    fields?: {
      id?:number,
      name?: string,
      address?: string,
      age?: number
    }) {
    if (fields) {
      this.id = fields.id || this.id;
      this.name = fields.name || this.name;
      this.address = fields.address || this.address;
      this.age = fields.age || this.age;
    }
  }
}



