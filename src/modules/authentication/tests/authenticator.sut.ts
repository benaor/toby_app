import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { SessionFactory } from "@authentication/core/models/AuthUser.factory";
import { Session } from "@authentication/core/models/AuthUser.type";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import {
  InMemoryStorage,
  InMemoryTypedStorage,
} from "@shared/storage/InMemoryStorage";
import { IStorage, TypedStorage } from "@shared/storage/storage.interface";

type SutParams = {
  authProvider?: AuthProvider;
  session?: Session;
  storage?: IStorage;
  typedStorage?: TypedStorage;
  isLogged?: boolean;
};

export const createAuthenticatorSut = (params?: SutParams) => {
  const storage = params?.storage || new InMemoryStorage();
  const typedStorage =
    params?.typedStorage || new InMemoryTypedStorage(storage);
  const session = params?.session || SessionFactory.SESSION();
  const authProvider = params?.authProvider || new StubAuthProvider(session);
  const alerter = new StubAlerter();
  const authenticator = new Authenticator(authProvider, typedStorage, alerter);

  if (params?.isLogged) typedStorage.set<Session>("session", session);

  return {
    authenticator,
    storage,
    alerter,
    authProvider,
    session,
    typedStorage,
  };
};
