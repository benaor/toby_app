import { Observable } from "@shared/utils/Observable";
import { Session, IUserForm } from "../models/AuthUser.type";
import { Credentials } from "../models/Credentials.type";
import { AuthProvider } from "../ports/AuthProvider.port";
import { SessionFactory } from "../models/Session.factory";

export class InMemoryAuthProvider implements AuthProvider {
  session = new Observable<Session | null>(null);
  users: Session[] = [
    SessionFactory.SESSION({
      user: {
        id: "1",
        email: "test@admin.dev",
      },
    }),
  ];

  constructor() {
    this.session.set(this.users[0]);
  }

  login = (credentials: Credentials) => {
    return new Promise<Session>((resolve, reject) => {
      const session = this.users.find(
        ({ user }) => user.email === credentials.email,
      );
      if (!session) return reject("Invalid credentials - AuthProvider");

      this.session.set(session);
      resolve(session);
    });
  };

  register = async (userForm: IUserForm) => {
    const session = SessionFactory.SESSION({ user: { ...userForm } });
    const index = this.users.push(session);

    return Promise.resolve({
      session,
      user: { id: String(index + 1), ...userForm },
    });
  };

  logout = async () => {
    this.session.set(null);
  };

  getSession = async () => {
    return Promise.resolve(this.session.get());
  };

  startAutoRefresh = () => {
    console.info("Auto refresh started");
  };

  stopAutoRefresh = () => {
    console.info("Auto refresh stopped");
  };

  onSessionChange = (cb: (session: Session | null) => void) => {
    this.session.addEventListener(cb);
  };
}
