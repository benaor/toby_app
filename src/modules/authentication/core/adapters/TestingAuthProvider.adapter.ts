import { Observable } from "@shared/utils/Observable";
import { Session } from "../models/AuthUser.type";
import { AuthProvider } from "../ports/AuthProvider.port";

export class StubAuthProvider implements AuthProvider {
  public session: Observable<Session>;

  constructor(session: Session) {
    this.session = new Observable(session);
  }

  login = () => Promise.resolve(this.session.get());
  logout = jest.fn().mockResolvedValue(Promise.resolve());
  getSession = () => Promise.resolve(this.session.get());
  onSessionChange: (cb: (session: Session | null) => void) => void = (cb) => {
    this.session.addEventListener(cb);
  };
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}

export class FailedAuthProvider implements AuthProvider {
  login = jest.fn().mockRejectedValue(new Error());
  logout = jest.fn().mockRejectedValue(new Error());
  getSession = jest.fn().mockRejectedValue(new Error());
  onSessionChange = jest.fn();
  startAutoRefresh = jest.fn();
  stopAutoRefresh = jest.fn();
}
