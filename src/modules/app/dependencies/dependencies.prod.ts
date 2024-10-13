import { Dependencies } from "./Dependencies.type";
import { AlertAlerter } from "@shared/alerter/AlertAlerter";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedStorageImpl } from "@shared/storage/TypedStorageImpl";
import { SupabaseAuthProvider } from "@authentication/core/adapters/SupabaseAuthProvider";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";

// In the production dependencies, we must use the final dependencies

const typedStorage = new TypedStorageImpl(AsyncStorage);
const authProvider = new SupabaseAuthProvider(typedStorage.getStorage());
const alerter = new AlertAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

// Repositories
const eventRepository = new StubEventRepository(); // TODO Change, its here to satisfies Type checking

export const prodDependencies: Dependencies = {
  typedStorage,
  authProvider,
  alerter,
  authenticator,
  eventRepository,
};
