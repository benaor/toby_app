import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect } from "expo-router";
import { AppState } from "react-native";

export default function RootScreen() {
  const { session, startAutoRefresh, stopAutoRefresh } = useAuthentication();

  AppState.addEventListener("change", (state) =>
    state === "active" ? startAutoRefresh() : stopAutoRefresh(),
  );

  return (
    <>
      {session ? (
        <Redirect href={screens.home} />
      ) : (
        <Redirect href={screens.onboarding} />
      )}
    </>
  );
}
