import { useAuthentication } from "@authentication/useAuthentication";
import { Redirect } from "expo-router";

export default function RootScreen() {
  const { isConnected, isDisconnected } = useAuthentication();

  return (
    <>
      {isConnected && <Redirect href="home" />}
      {isDisconnected && <Redirect href="onboarding" />}
    </>
  );
}
