import React, { FC } from "react";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Avatar } from "@components/Avatar";
import { Typography } from "@components/Typography";
import { firstCharToUppercase } from "@utils/strings/firstCharToUppercase";
import { stringToColor } from "@utils/strings/stringToColor";

type MessageCardProps = {
  message: string;
  author: {
    name: string;
    avatar: string;
  };
  isMyMessage: boolean;
};

export const MessageCard: FC<MessageCardProps> = ({
  message,
  author,
  isMyMessage,
}) => {
  const variantStyle = createStyleSheet((theme) => ({
    container: {
      flexDirection: isMyMessage ? "row-reverse" : "row",
      alignContent: isMyMessage ? "flex-end" : "flex-start",
      marginLeft: isMyMessage ? "auto" : 0,
      marginRight: isMyMessage ? 0 : "auto",
    },
    author: {
      color: stringToColor(author.name),
    },
    messageView: {
      backgroundColor: isMyMessage
        ? theme.colors.secondary.low
        : theme.colors.background.low,
    },
  }));
  return (
    <View style={[styles.container, variantStyle.container]}>
      <Avatar uri={author.avatar} />
      <View style={[styles.messageView, variantStyle.messageView]}>
        <Typography.Body size="small" bold style={variantStyle.author}>
          {firstCharToUppercase(author.name)}
        </Typography.Body>
        <Typography.Body size="small" lvlColor="medium" style={styles.message}>
          {message}
        </Typography.Body>
      </View>
    </View>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "60%",
    gap: 10,
  },
  messageView: {
    borderRadius: 10,
    padding: 12,
    gap: 5,
  },
  message: {},
}));
