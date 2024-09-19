import { Session } from "../models/AuthUser.type";
import type { Credentials } from "../models/Credentials.type";

export interface AuthProvider {
  login: (credentials: Credentials) => Promise<Session>;
  logout: () => Promise<void>;
  getSession: () => Promise<Session | null>;
  startAutoRefresh: VoidFunction;
  stopAutoRefresh: VoidFunction;
  onAuthStateChange: (cb: (session: Session | null) => void) => void;
}
