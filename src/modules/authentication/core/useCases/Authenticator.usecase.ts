import { AuthProvider } from "../ports/AuthProvider.port";
import { AuthUser } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { IStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";

export class AuthenticatorUseCases {
  private _user?: AuthUser;

  constructor(
    private authProvider: AuthProvider,
    private storage: IStorage,
    private alert: Alerter,
  ) {}

  async login(credentials: Credentials) {
    try {
      this._user = await this.authProvider.login(credentials);
      this.storage.set("authUser", this._user);
      this.alert.success("You are now connected");
    } catch {
      delete this._user;
      this.alert.error("Invalid credentials");
    }
  }

  async logout() {
    try {
      await this.authProvider.logout();
      this.storage.remove("authUser");
      this.alert.success("You are now disconnected");
    } catch {
      this.alert.error("an error occurred while disconnecting");
    }
  }

  async initialize() {
    const storedUser = this.storage.get<AuthUser>("authUser");
    if (!storedUser) return;
    this._user = storedUser;
  }

  get user() {
    return this._user;
  }

  isConnected() {
    return !!this._user;
  }
}
