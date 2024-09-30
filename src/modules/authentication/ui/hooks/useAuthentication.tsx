import { useDependencies } from "@/src/dependencies/useDependencies";
import {
  AuthUseCaseResponse,
  Session,
  UserForm,
} from "@authentication/core/models/AuthUser.type";
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
  register: (userForm: UserForm) => Promise<AuthUseCaseResponse>;
};

const authContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { authenticator } = useDependencies();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authenticator.initialize().then((session) => {
      setSession(session);
    });

    authenticator.onSessionChange((session) => {
      setSession(session);
    });
  }, [authenticator]);

  const logout = authenticator.logout;
  const register = authenticator.register;
  const stopAutoRefresh = authenticator.stopAutoRefresh;
  const startAutoRefresh = authenticator.startAutoRefresh;
  const signInWithEmail = authenticator.login;

  const value: AuthContext = {
    session,
    signInWithEmail,
    register,
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
