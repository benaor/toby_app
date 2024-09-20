import { createContext, ReactNode, useContext, useMemo } from "react";
import { Dependencies } from "./Dependencies.type";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { IStorage, TypedStorage } from "@shared/storage/storage.interface";
import { Alerter } from "@shared/alerter/alerter.interface";
import { InMemoryTypedStorage } from "@shared/storage/InMemoryStorage";
import { SupabaseAuthProvider } from "@authentication/core/adapters/SupabaseAuthProvider";

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = ({
  children,
  dependencies,
}: {
  children: ReactNode;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialDeps = useMemo<Dependencies>(() => {
    const storage: IStorage = localStorage;
    const typedStorage: TypedStorage = new InMemoryTypedStorage(storage);
    const authProvider: AuthProvider = new SupabaseAuthProvider(storage);

    const alerter: Alerter = {
      success: alert,
      error: alert,
    };

    const authenticator = new Authenticator(
      authProvider,
      typedStorage,
      alerter,
    );

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
