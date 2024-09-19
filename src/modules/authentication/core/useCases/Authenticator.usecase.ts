import { AuthProvider } from "../ports/AuthProvider.port";
import { Session } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { TypedStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";

export class Authenticator {
  private _session: Session | null = null;

  constructor(
    private authProvider: AuthProvider,
    private storage: TypedStorage,
    private alert: Alerter,
  ) {}

  async login(credentials: Credentials) {
    try {
      this._session = await this.authProvider.login(credentials);
      this.storage.set("session", this._session);
      this.alert.success("You are now connected");
    } catch {
      this._session = null;
      this.alert.error("Invalid credentials");
    }
  }

  async logout() {
    try {
      await this.authProvider.logout();
      this.storage.remove("session");
      this.alert.success("You are now disconnected");
    } catch {
      this.alert.error("an error occurred while disconnecting");
    }
  }

  async initialize() {
    const storedUser = this.storage.get<Session>("session");
    if (!storedUser) return;
    this._session = storedUser;
  }

  startAutoRefresh() {
    this.authProvider.startAutoRefresh();
  }

  stopAutoRefresh() {
    this.authProvider.stopAutoRefresh();
  }

  isConnected() {
    return !!this._session;
  }

  get session() {
    return this._session;
  }
}
