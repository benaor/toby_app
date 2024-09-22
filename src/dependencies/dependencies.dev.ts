import {
  InMemoryStorage,
  InMemoryTypedStorage,
} from "@shared/storage/InMemoryStorage";
import { Dependencies } from "./Dependencies.type";
import { InMemoryAuthProvider } from "@authentication/core/adapters/InMemoryAuthProvider";
import { AlertAlerter } from "@shared/alerter/AlertAlerter";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";

const storage = new InMemoryStorage();
const typedStorage = new InMemoryTypedStorage(storage);
const authProvider = new InMemoryAuthProvider();
const alerter = new AlertAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

export const devDependencies: Dependencies = {
  storage,
  typedStorage,
  authProvider,
  alerter,
  authenticator,
};
