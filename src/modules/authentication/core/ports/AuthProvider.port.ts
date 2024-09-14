import { AuthUser } from "../models/AuthUser.type";
import type { Credentials } from "../models/Credentials.type";

export interface AuthProvider {
  login: (credentials: Credentials) => Promise<AuthUser>;
}
