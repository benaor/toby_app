import { AuthUserFactory } from "../models/AuthUser.factory";
import { SessionUser } from "../models/AuthUser.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  private authUser: SessionUser = AuthUserFactory.create();

  constructor(authUser?: SessionUser) {
    if (authUser) this.authUser = authUser;
  }

  login = jest.fn().mockResolvedValue(Promise.resolve(this.authUser));
  logout = jest.fn().mockResolvedValue(Promise.resolve());
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}

export class FailedAuthProvider implements AuthProvider {
  login = jest.fn().mockRejectedValue(new Error());
  logout = jest.fn().mockRejectedValue(new Error());
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}
