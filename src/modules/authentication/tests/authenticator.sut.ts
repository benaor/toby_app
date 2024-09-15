import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { AuthUserFactory } from "@authentication/core/models/AuthUser.factory";
import { AuthUser } from "@authentication/core/models/AuthUser.type";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { AuthenticatorUseCases } from "@authentication/core/useCases/Authenticator.usecase";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";

type SutParams = {
  authProvider?: AuthProvider;
  user?: AuthUser;
  storage?: Storage;
  isLogged?: boolean;
};

export const createAuthenticatorSut = (params?: SutParams) => {
  const storage = new InMemoryStorage();
  const user = params?.user || AuthUserFactory.create();
  const authProvider = params?.authProvider || new StubAuthProvider(user);
  const alerter = new StubAlerter();
  const authenticator = new AuthenticatorUseCases(
    authProvider,
    storage,
    alerter,
  );

  if (params?.isLogged) storage.set("authUser", user);

  return { authenticator, storage, alerter, authProvider, user };
};
