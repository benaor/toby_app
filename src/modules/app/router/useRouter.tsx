import { createContext, FC, PropsWithChildren, useContext } from "react";
import { Router } from "./Router.port";
import { useDependencies } from "@app/react/useDependencies";

const RouterContext = createContext<Router | null>(null);

export const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const { router } = useDependencies();

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouter = () => {
  const router = useContext(RouterContext);

  // istanbul ignore next - don't need to test this
  if (!router) throw new Error("No router found");

  return router;
};
