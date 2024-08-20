import { FC, useMemo } from "react";
import { Typography } from "../Typography";
import { useButtonProps } from "./useButtonProps";
import { ColorAndLevelTuple } from "@themes/theme";

type LabelProps = {
  label: string;
  colors?: ColorAndLevelTuple;
  bold?: boolean;
};

export const Label: FC<LabelProps> = ({ label, colors, bold }) => {
  const { variant } = useButtonProps();

  const [color, lvlColor]: ColorAndLevelTuple = useMemo(() => {
    if (colors) return colors;

    switch (variant) {
      case "text":
        return ["typography", "high"];
      case "contained":
      default:
        return ["typography", "low"];
    }
  }, [variant, colors]);

  return (
    <Typography.Body
      color={color}
      lvlColor={lvlColor}
      bold={bold}
      textAlign="center"
    >
      {label}
    </Typography.Body>
  );
};
