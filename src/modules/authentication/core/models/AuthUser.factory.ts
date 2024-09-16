import { SessionUser } from "./AuthUser.type";

export class AuthUserFactory {
  static create(authUser?: Partial<SessionUser>): SessionUser {
    return {
      id: "1",
      email: "john@doe.com",
      ...authUser,
    };
  }
}
