import { AuthProvider } from "../ports/AuthProvider.port";
import { Session } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";

import { Alerter } from "@shared/alerter/alerter.interface";
import { TypedStorage } from "@shared/storage/typedStorage.interface";
import { Observable } from "@shared/utils/Observable";

export class Authenticator {
  private _session = new Observable<Session | null>(null);

  constructor(
    private authProvider: AuthProvider,
    private storage: TypedStorage,
    private alert: Alerter,
  ) {}

  async login(credentials: Credentials) {
    try {
      const session = await this.authProvider.login(credentials);
      this._session.set(session);
      await this.storage.set("session", this._session.get());
      this.alert.success("You are now connected");
    } catch {
      this._session.set(null);
      this.alert.error("Invalid credentials");
    }
  }

  async logout() {
    try {
      await this.authProvider.logout();
      await this.storage.remove("session");
      this.alert.success("You are now disconnected");
    } catch {
      this.alert.error("an error occurred while disconnecting");
    }
  }

  onSessionChange(cb: (session: Session | null) => void) {
    this.authProvider.onSessionChange(cb);
  }

  startAutoRefresh() {
    this.authProvider.startAutoRefresh();
  }

  stopAutoRefresh() {
    this.authProvider.stopAutoRefresh();
  }

  async initialize() {
    try {
      const session = await this.authProvider.getSession();
      this._session.set(session);
      return session;
    } catch {
      this._session.set(null);
      return null;
    }
  }

  get session() {
    return this._session.get();
  }
}
