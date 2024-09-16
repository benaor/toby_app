import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { AuthUserFactory } from "@authentication/core/models/AuthUser.factory";
import { SessionUser } from "@authentication/core/models/AuthUser.type";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";

type SutParams = {
  authProvider?: AuthProvider;
  user?: SessionUser;
  storage?: Storage;
  isLogged?: boolean;
};

export const createAuthenticatorSut = async (params?: SutParams) => {
  const storage = new InMemoryStorage();
  const user = params?.user || AuthUserFactory.create();
  const authProvider = params?.authProvider || new StubAuthProvider(user);
  const alerter = new StubAlerter();
  const authenticator = new Authenticator(authProvider, storage, alerter);

  if (params?.isLogged) await storage.set("authUser", user);

  return { authenticator, storage, alerter, authProvider, user };
};
