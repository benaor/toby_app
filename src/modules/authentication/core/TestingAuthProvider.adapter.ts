import { AuthUserFactory } from "@authentication/AuthUser.factory";
import { AuthProvider } from "./AuthProvider.port";
import { Credentials } from "./Credentials.type";

export class StubAuthProvider implements AuthProvider {
  login(_: Credentials) {
    const authUser = AuthUserFactory.create();
    return Promise.resolve(authUser);
  }
}

export class FailedAuthProvider implements AuthProvider {
  login(_: Credentials) {
    return Promise.reject(new Error());
  }
}
