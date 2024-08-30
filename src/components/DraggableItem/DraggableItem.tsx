import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

type DraggableItemProps = {
  label: string;
  onDelete: VoidFunction;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  label,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="drag-indicator" size={24} />

      <View style={styles.label}>
        <Typography.Body textAlign="center" bold>
          {label}
        </Typography.Body>
      </View>

      {onDelete && (
        <IconButton name="closecircle" size={15} onPress={onDelete} />
      )}
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    textAlign: "center",
    backgroundColor: theme.colors.background.medium,
    borderRadius: 10,
    flexGrow: 1,
    marginHorizontal: 30,
  },
}));
