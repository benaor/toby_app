import { Session, SessionToken, SessionUser, IUserForm } from "./AuthUser.type";

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
      expiresAt: 2526332400, // 2050-01-01,
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

  static USER_FORM(user?: Partial<IUserForm>): IUserForm {
    return {
      ...fakeUser,
      ...user,
    };
  }
}

// This type is never used in production. Only to make test simpler.
type FullUser = SessionUser & IUserForm;

const fakeUser: FullUser = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.dev",
  password: "password",
};
