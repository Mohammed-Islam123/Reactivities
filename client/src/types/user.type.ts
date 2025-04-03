export default interface userLogin {
  email: string;
  password: string;
  displayName?: string;
  userName?: string;
}
export interface User {
  email: string;
  image?: string;
  token?: string;
  displayName: string;
  userName: string;
  bio?: string;
}
