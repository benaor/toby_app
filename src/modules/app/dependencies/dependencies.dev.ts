import { Dependencies } from "./Dependencies.type";
import { InMemoryAuthProvider } from "@authentication/core/adapters/InMemoryAuthProvider";
import { AlertAlerter } from "@shared/alerter/AlertAlerter";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";
import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";

// In the dev environment, we should use Fake/InMemory or sometimes final dependencies
const storage = new InMemoryStorage();
const typedStorage = new TypedStorageImpl(storage);
const authProvider = new InMemoryAuthProvider();
const alerter = new AlertAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

// Repositories
const eventRepository = new StubEventRepository(); // TODO Change, its here to satisfies Type checking

export const devDependencies: Dependencies = {
  typedStorage,
  authProvider,
  alerter,
  authenticator,

  eventRepository,
};
