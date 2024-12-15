import { Router } from "@app/router/Router.port";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { Authenticator } from "@authentication/core/useCases/Authenticator.usecase";
import { EventRepository } from "@events/core/ports/EventRepository";
import { GuestsRepository } from "@events/core/ports/GuestsRepository";
import { Alerter } from "@shared/alerter/alerter.interface";
import { TypedStorage } from "@shared/storage/typedStorage.interface";

export type Dependencies = {
  // ports
  authProvider: AuthProvider;
  typedStorage: TypedStorage;
  alerter: Alerter;
  router: Router;

  // services
  authenticator: Authenticator;

  // Repository
  eventRepository: EventRepository;
  guestsRepository: GuestsRepository;
};
