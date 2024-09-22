import { InMemoryTypedStorage } from "@shared/storage/InMemoryStorage";
import { Dependencies } from "./Dependencies.type";
import { InMemoryAuthProvider } from "@authentication/core/adapters/InMemoryAuthProvider";
import { AlertAlerter } from "@shared/alerter/AlertAlerter";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = AsyncStorage;
const typedStorage = new InMemoryTypedStorage(storage);
const authProvider = new InMemoryAuthProvider();
const alerter = new AlertAlerter();

//Services (use cases)
const authenticator = new Authenticator(authProvider, typedStorage, alerter);

export const prodDependencies: Dependencies = {
  storage,
  typedStorage,
  authProvider,
  alerter,
  authenticator,
};
