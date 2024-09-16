export type SessionUser = {
  id: string;
  email: string;
};

type SessionToken = {
  value: string;
  expiresAt: string;
};

export type Session = {
  user: SessionUser;
  accessToken: SessionToken;
  refreshToken: SessionToken;
};
