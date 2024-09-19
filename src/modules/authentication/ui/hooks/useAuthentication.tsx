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
  isReady: boolean;
  isConnected: boolean;
  signInWithEmail: (credentials: Credentials) => Promise<void>;
  stopAutoRefresh: VoidFunction;
  startAutoRefresh: VoidFunction;
  logout: () => Promise<void>;
};

const authContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { authenticator } = useDependencies();

  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await authenticator.initialize();
      setIsReady(true);
    })();
  }, [authenticator]);

  useEffect(() => {
    setSession(authenticator.session);
  }, [authenticator.session]);

  const logout = async () => await authenticator.logout();
  const stopAutoRefresh = () => authenticator.stopAutoRefresh();
  const startAutoRefresh = () => authenticator.startAutoRefresh();
  const signInWithEmail = async (credentials: Credentials) => {
    await authenticator.login(credentials);
    setSession(authenticator.session || null);
  };

  const isConnected = authenticator.isConnected();

  const value: AuthContext = {
    isReady,
    session,
    isConnected,
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
