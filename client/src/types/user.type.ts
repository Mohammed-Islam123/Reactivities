export default interface userLogin {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
export interface User {
  email: string;
  image?: string;
  token?: string;
  displayName: string;
  username: string;
}
