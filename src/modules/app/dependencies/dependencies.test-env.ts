import { Dependencies } from "./Dependencies.type";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";
import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

const storage = new InMemoryStorage();
const typedStorage = new TypedStorageImpl(storage);
const authProvider = new StubAuthProvider(null);
const alerter = new StubAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

export const testDependencies: Dependencies = {
  typedStorage,
  authProvider,
  alerter,
  authenticator,
};
