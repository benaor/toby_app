import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { Alerter } from "@shared/alerter/alerter.interface";
import { AsyncStorage, TypedStorage } from "@shared/storage/storage.interface";

export type Dependencies = {
  // ports
  authProvider: AuthProvider;
  storage: AsyncStorage;
  typedStorage: TypedStorage;
  alerter: Alerter;

  // services
  authenticator: Authenticator;
};
