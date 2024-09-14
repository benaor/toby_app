import { AuthUser } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  constructor(private readonly authUser: AuthUser) {}

  login(_: Credentials) {
    return Promise.resolve(this.authUser);
  }
}

export class FailedAuthProvider implements AuthProvider {
  login(_: Credentials) {
    return Promise.reject(new Error());
  }
}
