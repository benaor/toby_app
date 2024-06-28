import { Typography } from "@components/Typography";
import { FC } from "react";
import { useNewPasswordScreen } from "./NewPasswordScreen.controller";

export const NewPasswordScreen: FC = () => {
  const presenter = useNewPasswordScreen();

  return <Typography.Header>NewPasswordScreen</Typography.Header>;
};
