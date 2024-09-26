import { Observable } from "@shared/utils/Observable";
import { Session } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { AuthProvider } from "../ports/AuthProvider.port";
import { SessionFactory } from "../models/AuthUser.factory";

const devCredentials: Credentials = {
  email: "test@admin.dev",
  password: "password",
};

export class InMemoryAuthProvider implements AuthProvider {
  session = new Observable<Session | null>(null);

  login: (credentials: Credentials) => Promise<Session> = (credentials) => {
    return new Promise((resolve, reject) => {
      if (isSameCredentials(credentials, devCredentials)) {
        const session: Session = SessionFactory.SESSION({
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
        });
        this.session.set(session);
        resolve(session);
      }
      reject("Invalid credentials - AuthProvider");
    });
  };

  logout: () => Promise<void> = async () => {
    this.session.set(null);
  };

  getSession: () => Promise<Session | null> = async () => {
    return Promise.resolve(this.session.get());
  };

  startAutoRefresh: VoidFunction = () => {
    console.info("Auto refresh started");
  };

  stopAutoRefresh: VoidFunction = () => {
    console.info("Auto refresh stopped");
  };

  onSessionChange: (cb: (session: Session | null) => void) => void = (cb) => {
    this.session.addEventListener(cb);
  };
}

const isSameCredentials = (
  credentials: Credentials,
  devCredentials: Credentials,
) => {
  return (
    credentials.email === devCredentials.email &&
    credentials.password === devCredentials.password
  );
};
