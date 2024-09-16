import { Session, SessionToken, SessionUser } from "./AuthUser.type";

export class SessionFactory {
  static SESSION_USER(authUser?: Partial<SessionUser>): SessionUser {
    return {
      id: "1",
      email: "john@doe.com",
      ...authUser,
    };
  }

  static SESSION_TOKEN(token?: Partial<SessionToken>): SessionToken {
    return {
      value: "token",
      expiresAt: "2030-01-01",
      ...token,
    };
  }

  static SESSION(session?: DeepPartial<Session>): Session {
    return {
      user: {
        ...this.SESSION_USER(session?.user),
      },
      accessToken: this.SESSION_TOKEN(session?.accessToken),
      refreshToken: this.SESSION_TOKEN(session?.refreshToken),
    };
  }
}
