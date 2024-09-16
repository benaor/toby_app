import { AuthProvider } from "../ports/AuthProvider.port";
import { SessionUser } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { IStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";

export class Authenticator {
  private _user?: SessionUser;

  constructor(
    private authProvider: AuthProvider,
    private storage: IStorage,
    private alert: Alerter,
  ) {}

  async login(credentials: Credentials) {
    try {
      this._user = await this.authProvider.login(credentials);
      await this.storage.set("authUser", this._user);
      this.alert.success("You are now connected");
    } catch {
      delete this._user;
      this.alert.error("Invalid credentials");
    }
  }

  async logout() {
    try {
      await this.authProvider.logout();
      await this.storage.remove("authUser");
      this.alert.success("You are now disconnected");
    } catch {
      this.alert.error("an error occurred while disconnecting");
    }
  }

  async initialize() {
    const storedUser = await this.storage.get<SessionUser>("authUser");
    if (!storedUser) return;
    this._user = storedUser;
  }

  startAutoRefresh() {
    this.authProvider.startAutoRefresh();
  }

  stopAutoRefresh() {
    this.authProvider.stopAutoRefresh();
  }

  get user() {
    return this._user;
  }

  isConnected() {
    return !!this._user;
  }
}
