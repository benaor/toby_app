import { FC, PropsWithChildren, createContext, useContext } from "react";
import { ButtonContextProps } from "./Button";

const ButtonProvider: FC<
  PropsWithChildren<{
    props: ButtonContextProps;
  }>
> = ({ props, children }) => {
  return (
    <ButtonContext.Provider value={props}>{children}</ButtonContext.Provider>
  );
};

const ButtonContext = createContext({} as ButtonContextProps);

const useButtonProps = () => {
  const context = useContext(ButtonContext);

  if (!context)
    throw new Error("useButtonProps must be used within a ButtonProvider");

  return context;
};

export { ButtonProvider, useButtonProps };
