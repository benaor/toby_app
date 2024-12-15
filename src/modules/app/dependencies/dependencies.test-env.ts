import { Dependencies } from "./Dependencies.type";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";
import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";
import { StubAlerter } from "@shared/alerter/StubAlerter";
import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { StubGuestsRepository } from "@events/core/adapters/StubGuestsRepository";
import { StubRouter } from "@app/router/StubRouter";

// In the test environment, We should mainly use Stub

const storage = new InMemoryStorage();
const typedStorage = new TypedStorageImpl(storage);
const authProvider = new StubAuthProvider(null);
const alerter = new StubAlerter();
const router = new StubRouter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

// Repository
const eventRepository = new StubEventRepository();
const guestsRepository = new StubGuestsRepository();

export const testDependencies: Dependencies = {
  typedStorage,
  authProvider,
  alerter,
  router,
  authenticator,
  eventRepository,
  guestsRepository,
};
