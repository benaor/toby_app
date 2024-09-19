import { createContext, ReactNode, useContext, useMemo } from "react";
import { Dependencies } from "./Dependencies.type";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { IStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = ({
  children,
  dependencies,
}: {
  children: ReactNode;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialDeps = useMemo<Dependencies>(() => {
    const authProvider: AuthProvider = {
      login: jest.fn(),
      logout: jest.fn(),
      initialize: jest.fn(),
      startAutoRefresh: jest.fn(),
      stopAutoRefresh: jest.fn(),
    };

    const storage: IStorage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const alerter: Alerter = {
      success: jest.fn(),
      error: jest.fn(),
    };

    const authenticator = new Authenticator(authProvider, storage, alerter);

    return {
      // Ports
      authProvider,
      storage,
      alerter,

      // services
      authenticator,
    };
  }, []);

  return (
    <DependenciesContext.Provider value={{ ...initialDeps, ...dependencies }}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => {
  const context = useContext(DependenciesContext);

  if (!context)
    throw new Error(
      "useDependencies must be used within a DependenciesProvider",
    );

  return context;
};
