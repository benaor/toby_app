export type SessionUser = {
  id: string;
  email: string;
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
