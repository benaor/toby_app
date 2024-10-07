import { createContext, ReactNode, useContext } from "react";
import { Dependencies } from "../dependencies/Dependencies.type";
import { app } from "@app/main";

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = ({
  children,
  dependencies,
}: {
  children: ReactNode;
  dependencies?: Partial<Dependencies>;
}) => (
  <DependenciesContext.Provider
    value={{ ...app.dependencies, ...dependencies }}
  >
    {children}
  </DependenciesContext.Provider>
);

export const useDependencies = () => {
  const context = useContext(DependenciesContext);

  if (!context)
    throw new Error(
      "useDependencies must be used within a DependenciesProvider",
    );

  return context;
};
