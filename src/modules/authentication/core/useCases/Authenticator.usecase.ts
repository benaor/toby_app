import { AuthProvider } from "../ports/AuthProvider.port";
import { AuthUser } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { IStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";

export class AuthenticatorUseCases {
  private user?: AuthUser;

  constructor(
    private authProvider: AuthProvider,
    private storage: IStorage,
    private alert: Alerter,
  ) {}

  async login(credentials: Credentials) {
    try {
      this.user = await this.authProvider.login(credentials);
      this.storage.set("authUser", this.user);
      this.alert.success("You are now connected");
    } catch {
      delete this.user;
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

  isConnected() {
    return !!this.user;
  }
}
