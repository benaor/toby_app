import { Storage } from "@/src/modules/shared/storage/Storage.port";
import { AuthProvider } from "../AuthProvider.port";
import { AuthUser } from "../AuthUser.type";
import { Credentials } from "../Credentials.type";
import { Alerter } from "@/src/modules/shared/alerter/Alerter.port";

export class AuthenticatorUseCases {
  private user?: AuthUser;

  constructor(
    private authProvider: AuthProvider,
    private storage: Storage,
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

  isConnected() {
    return !!this.user;
  }
}
