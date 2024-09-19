import { SessionFactory } from "../models/AuthUser.factory";
import { Session } from "../models/AuthUser.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  private session: Session = SessionFactory.SESSION();

  constructor(session?: Session) {
    if (session) this.session = session;
  }

  login = jest.fn().mockResolvedValue(Promise.resolve(this.session));
  logout = jest.fn().mockResolvedValue(Promise.resolve());
  onAuthStateChange = jest.fn();
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}

export class FailedAuthProvider implements AuthProvider {
  login = jest.fn().mockRejectedValue(new Error());
  logout = jest.fn().mockRejectedValue(new Error());
  initialize = jest.fn().mockRejectedValue(new Error());
  onAuthStateChange = jest.fn();
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}
