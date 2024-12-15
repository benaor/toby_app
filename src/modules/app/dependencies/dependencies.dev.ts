import { Dependencies } from "./Dependencies.type";
import { InMemoryAuthProvider } from "@authentication/core/adapters/InMemoryAuthProvider";
import { AlertAlerter } from "@shared/alerter/AlertAlerter";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { InMemoryStorage } from "@shared/storage/InMemoryStorage";
import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";
import { InMemoryEventRepository } from "@events/core/adapters/InMemoryEventRepository";
import { StubGuestsRepository } from "@events/core/adapters/StubGuestsRepository";
import { router } from "expo-router";

// In the dev environment, we should use Fake/InMemory or sometimes final dependencies
const storage = new InMemoryStorage();
const typedStorage = new TypedStorageImpl(storage);
const authProvider = new InMemoryAuthProvider();
const alerter = new AlertAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

// Repositories
const eventRepository = new InMemoryEventRepository();
const guestsRepository = new StubGuestsRepository();

export const devDependencies: Dependencies = {
  typedStorage,
  authProvider,
  alerter,
  router,
  authenticator,
  eventRepository,
  guestsRepository,
};
