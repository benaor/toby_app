import { Typography } from "@/src/components";
import { screens } from "@/src/constants/screens";
import { Link } from "expo-router";

export default function SignInScreen() {
  return (
    <>
      <Typography.Header>Connexion</Typography.Header>
      <Link href={screens.signUp}>
        <Typography.Body>S'inscrire</Typography.Body>
      </Link>
    </>
  );
}
