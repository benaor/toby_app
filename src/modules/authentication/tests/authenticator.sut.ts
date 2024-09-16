import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { SessionFactory } from "@authentication/core/models/AuthUser.factory";
import { Session } from "@authentication/core/models/AuthUser.type";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";

type SutParams = {
  authProvider?: AuthProvider;
  session?: Session;
  storage?: Storage;
  isLogged?: boolean;
};

export const createAuthenticatorSut = async (params?: SutParams) => {
  const storage = new InMemoryStorage();
  const session = params?.session || SessionFactory.SESSION();
  const authProvider = params?.authProvider || new StubAuthProvider(session);
  const alerter = new StubAlerter();
  const authenticator = new Authenticator(authProvider, storage, alerter);

  if (params?.isLogged) await storage.set("session", session);

  return { authenticator, storage, alerter, authProvider, session };
};
