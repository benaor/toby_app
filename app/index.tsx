import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect } from "expo-router";

export default function RootScreen() {
  const { isConnected, isDisconnected } = useAuthentication();

  return <Redirect href={screens.eventSummary("1")} />;
  return (
    <>
      {isConnected && <Redirect href={screens.home} />}
      {isDisconnected && <Redirect href={screens.onboarding} />}
    </>
  );
}
