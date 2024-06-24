import { FC, createContext, useContext } from "react";
import { ButtonProps } from "./Button";

const ButtonProvider: FC<{
  children: React.ReactNode;
  props: ButtonProps;
}> = ({ props, children }) => {
  return (
    <ButtonContext.Provider value={props}>{children}</ButtonContext.Provider>
  );
};

const ButtonContext = createContext({} as ButtonProps);

const useButtonProps = () => {
  const context = useContext(ButtonContext);

  if (!context)
    throw new Error("useButtonProps must be used within a ButtonProvider");

  return context;
};

export { ButtonProvider, useButtonProps };
