import { useDependencies } from "@/src/dependencies/useDependencies";
import { Session } from "@authentication/core/models/AuthUser.type";
import { Credentials } from "@authentication/core/models/Credentials.type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  session: Session | null;
  signInWithEmail: (credentials: Credentials) => Promise<Session | null>;
  stopAutoRefresh: VoidFunction;
  startAutoRefresh: VoidFunction;
  logout: () => Promise<void>;
};

const authContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { authenticator } = useDependencies();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authenticator.initialize().then((session) => {
      setSession(session);
    });

    authenticator.onAuthStateChange((session) => {
      setSession(session);
    });
  }, [authenticator]);

  const logout = async () => await authenticator.logout();
  const stopAutoRefresh = () => authenticator.stopAutoRefresh();
  const startAutoRefresh = () => authenticator.startAutoRefresh();
  const signInWithEmail = async (credentials: Credentials) => {
    await authenticator.login(credentials);
    const session = authenticator.session;

    if (!session) return null;
    return session;
  };

  const value: AuthContext = {
    session,
    signInWithEmail,
    startAutoRefresh,
    stopAutoRefresh,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuthentication = () => {
  const context = useContext(authContext);

  if (!context)
    throw new Error("useAuthentication must be used within a AuthProvider");

  return context;
};
