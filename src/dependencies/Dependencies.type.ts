import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { Alerter } from "@shared/alerter/alerter.interface";
import { TypedStorage } from "@shared/storage/typedStorage.interface";

export type Dependencies = {
  // ports
  authProvider: AuthProvider;
  typedStorage: TypedStorage;
  alerter: Alerter;

  // services
  authenticator: Authenticator;
};
