import { createContext, ReactNode, useContext, useMemo } from "react";
import { Dependencies } from "./Dependencies.type";
import { devDependencies } from "./dependencies.dev";
import { prodDependencies } from "./dependencies.prod";

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = ({
  children,
  dependencies,
}: {
  children: ReactNode;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialDeps = useMemo<Dependencies>(() => {
    if (process.env.NODE_ENV === "production") return prodDependencies;
    return devDependencies;
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
