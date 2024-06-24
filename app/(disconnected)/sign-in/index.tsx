import { Typography } from "@/src/components";
import { Link } from "expo-router";

export default function SignInScreen() {
  return (
    <>
      <Typography.Header>Connexion</Typography.Header>
      <Link href="/sign-up">
        <Typography.Body>S'inscrire</Typography.Body>
      </Link>
    </>
  );
}
