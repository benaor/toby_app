import {
  AuthRegisterResponse,
  Session,
  IUserForm,
} from "../models/AuthUser.type";
import type { Credentials } from "../models/Credentials.type";

export interface AuthProvider {
  login: (credentials: Credentials) => Promise<Session>;
  logout: () => Promise<void>;
  register: (userForm: IUserForm) => Promise<AuthRegisterResponse>;
  getSession: () => Promise<Session | null>;
  startAutoRefresh: VoidFunction;
  stopAutoRefresh: VoidFunction;
  onSessionChange: (cb: (session: Session | null) => void) => void;
}
