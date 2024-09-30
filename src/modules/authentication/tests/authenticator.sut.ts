import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { SessionFactory } from "@authentication/core/models/Session.factory";
import { Session } from "@authentication/core/models/AuthUser.type";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";
import { AsyncStorage } from "@shared/storage/storage.interface";

import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";

type SutParams = {
  authProvider?: AuthProvider;
  session?: Session;
  storage?: AsyncStorage;
  isLogged?: boolean;
};

export const createAuthenticatorSut = async (params?: SutParams) => {
  const storage = params?.storage || new InMemoryStorage();
  const typedStorage = new TypedStorageImpl(storage);
  const session = params?.session || SessionFactory.SESSION();
  const authProvider = params?.authProvider || new StubAuthProvider(session);
  const alerter = new StubAlerter();
  const authenticator = new Authenticator(authProvider, typedStorage, alerter);

  if (params?.isLogged) await typedStorage.set<Session>("session", session);

  return {
    authenticator,
    alerter,
    authProvider,
    session,
    typedStorage,
  };
};
