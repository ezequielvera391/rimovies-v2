import { User } from "./user.interface";

export interface loginResponse {
  access_token: string,
  user: User
}
