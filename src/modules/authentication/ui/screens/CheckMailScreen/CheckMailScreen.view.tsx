import { Typography } from "@components/Typography";
import { FC } from "react";
import { useCheckMailScreen } from "./CheckMailScreen.controller";

export const CheckMailScreen: FC = () => {
  const presenter = useCheckMailScreen();

  return <Typography.Header>CheckMailScreen</Typography.Header>;
};
