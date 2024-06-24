import { FC } from "react";
import { Typography, TypographyBodyProps } from "../Typography";
import { useButtonProps } from "./useButtonProps";

type ColorAndLvlTuple = [
  TypographyBodyProps["color"],
  TypographyBodyProps["lvlColor"],
];

export const Label: FC<{ label: string }> = ({ label }) => {
  const { variant } = useButtonProps();

  const computeTextColor = (): ColorAndLvlTuple => {
    switch (variant) {
      case "text":
        return ["typography", "high"];
      case "contained":
      default:
        return ["typography", "low"];
    }
  };

  return (
    <Typography.Body
      color={computeTextColor()[0]}
      lvlColor={computeTextColor()[1]}
      textAlign="center"
    >
      {label}
    </Typography.Body>
  );
};
