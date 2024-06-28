import { FC } from "react";
import { useChangePasswordSuccessScreen } from "./ChangePasswordSuccessScreen.controller";
import { Typography } from "@components/Typography";

export const ChangePasswordSuccessScreen: FC = () => {
  const presenter = useChangePasswordSuccessScreen();

  return <Typography.Header>ChangePasswordSuccessScreen</Typography.Header>;
};
