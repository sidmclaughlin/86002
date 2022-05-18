export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
}

export class User {
  id!: number;
  role!: Role;
  email!: string;
  name!: string;
}
