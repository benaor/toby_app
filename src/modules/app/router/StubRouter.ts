import { Router } from "./Router.port";

export class StubRouter implements Router {
  navigate = jest.fn();
  setParams = jest.fn();
  back = jest.fn();
  canGoBack = jest.fn();
  push = jest.fn();
  replace = jest.fn();
  dismiss = jest.fn();
  dismissAll = jest.fn();
  canDismiss = jest.fn();
  dismissTo = jest.fn();
  reload = jest.fn();
}
