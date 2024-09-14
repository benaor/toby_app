import { AuthUser } from "./AuthUser.type";
import type { Credentials } from "./Credentials.type";

export interface AuthProvider {
  login: (credentials: Credentials) => Promise<AuthUser>;
}
