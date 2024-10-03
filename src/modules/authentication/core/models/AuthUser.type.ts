export type SessionUser = {
  id: Identifier;
  email: string;
};

export type IUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SessionToken = {
  value: string;
  expiresAt?: number;
};

export type Session = {
  user: SessionUser;
  accessToken: SessionToken;
  refreshToken: SessionToken;
};

export type AuthRegisterResponse = AuthRegisterSuccess | AuthRegisterError;

export type AuthUseCaseResponse =
  | {
      user: SessionUser;
    }
  | {
      error: string;
    };

type AuthRegisterSuccess = {
  user: SessionUser;
  session: Session;
};

type AuthRegisterError = {
  error: string;
};
