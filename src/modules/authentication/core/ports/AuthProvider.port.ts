import { SessionUser } from "../models/AuthUser.type";
import type { Credentials } from "../models/Credentials.type";

export interface AuthProvider {
  login: (credentials: Credentials) => Promise<SessionUser>;
  logout: () => Promise<void>;
  startAutoRefresh: VoidFunction;
  stopAutoRefresh: VoidFunction;
}
