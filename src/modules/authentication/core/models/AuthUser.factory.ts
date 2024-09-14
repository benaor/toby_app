import { AuthUser } from "./AuthUser.type";

export class AuthUserFactory {
  static create(authUser?: Partial<AuthUser>): AuthUser {
    return {
      id: "1",
      email: "john@doe.com",
      ...authUser,
    };
  }
}
