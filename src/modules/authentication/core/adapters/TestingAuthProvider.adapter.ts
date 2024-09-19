import { SessionFactory } from "../models/AuthUser.factory";
import { Session } from "../models/AuthUser.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  private session: Session;

  constructor(session?: Session) {
    this.session = session || SessionFactory.SESSION();
  }

  login = () => Promise.resolve(this.session);
  logout = jest.fn().mockResolvedValue(Promise.resolve());
  getSession = () => Promise.resolve(this.session);
  onAuthStateChange = jest.fn();
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}

export class FailedAuthProvider implements AuthProvider {
  login = jest.fn().mockRejectedValue(new Error());
  logout = jest.fn().mockRejectedValue(new Error());
  getSession = jest.fn().mockRejectedValue(new Error());
  onAuthStateChange = jest.fn();
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}
