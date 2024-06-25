import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/useAuthentication";
import { Redirect } from "expo-router";

export default function RootScreen() {
  const { isConnected, isDisconnected } = useAuthentication();

  return (
    <>
      {isConnected && <Redirect href={screens.home} />}
      {isDisconnected && <Redirect href={screens.onboarding} />}
    </>
  );
}
