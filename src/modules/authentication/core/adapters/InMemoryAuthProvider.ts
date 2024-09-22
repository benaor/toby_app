import { Session } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { AuthProvider } from "../ports/AuthProvider.port";

const devCredentials = {
  email: "test@admin.dev",
  password: "password",
};

export class InMemoryAuthProvider implements AuthProvider {
  session: Session | null = null;

  login: (credentials: Credentials) => Promise<Session> = (credentials) => {
    return new Promise((resolve, reject) => {
      if (credentials === devCredentials) {
        this.session = {
          user: {
            id: "1",
            email: "test@admin.dev",
          },
          accessToken: {
            value: "token",
            expiresAt: 2526332400, // 2050-01-01
          },
          refreshToken: {
            value: "token",
            expiresAt: 2526332400, // 2050-01-01
          },
        };
        resolve(this.session);
      }
      reject("Invalid credentials");
    });
  };

  logout: () => Promise<void> = async () => {
    this.session = null;
  };

  getSession: () => Promise<Session | null> = async () => {
    return this.session;
  };

  startAutoRefresh: VoidFunction = () => {
    console.info("Auto refresh started");
  };

  stopAutoRefresh: VoidFunction = () => {
    console.info("Auto refresh stopped");
  };

  onAuthStateChange: (cb: (session: Session | null) => void) => void = (cb) => {
    cb(this.session);
  };
}
