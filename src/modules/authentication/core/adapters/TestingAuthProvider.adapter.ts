import { AuthUserFactory } from "../models/AuthUser.factory";
import { AuthUser } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  public logoutFn = jest.fn();

  constructor(private readonly authUser: AuthUser = AuthUserFactory.create()) {}

  login(_: Credentials) {
    return Promise.resolve(this.authUser);
  }

  logout() {
    return Promise.resolve(this.logoutFn());
  }
}

export class FailedAuthProvider implements AuthProvider {
  login(_: Credentials) {
    return Promise.reject(new Error());
  }

  logout() {
    return Promise.reject(new Error());
  }
}
