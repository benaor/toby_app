import { GestureResponderEvent } from "react-native";

declare module "react-native" {
  export type OnPressFunction = (event: GestureResponderEvent) => void;
}
