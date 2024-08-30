import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC, PropsWithChildren } from "react";
import { Pressable, View } from "react-native";

type SummarySubSectionProps = PropsWithChildren<{
  title: string;
  subTitle?: string;
  onEdit?: VoidFunction;
}>;

export const SummarySubSection: FC<SummarySubSectionProps> = ({
  children,
  title,
  subTitle,
  onEdit,
}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.titleView}>
          <Typography.Header style={styles.title} size="medium" color="primary">
            {title}
          </Typography.Header>

          {subTitle && (
            <Typography.Body size="small" lvlColor="medium">
              ({subTitle})
            </Typography.Body>
          )}
        </View>

        {onEdit && (
          <Pressable onPress={onEdit}>
            <Typography.Body color="primary">Modifier</Typography.Body>
          </Pressable>
        )}
      </View>
      {children}
    </>
  );
};

const styles = createStyleSheet(() => ({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    paddingVertical: 10,
    marginLeft: 0,
  },
}));
