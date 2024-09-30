export type SessionUser = {
  id: string;
  email: string;
};

export type UserForm = {
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

type AuthRegisterSuccess = {
  user: SessionUser;
  session: Session;
};

type AuthRegisterError = {
  error: string;
};
