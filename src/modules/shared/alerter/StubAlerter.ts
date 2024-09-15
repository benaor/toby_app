import { Alerter } from "./alerter.interface";

export class StubAlerter implements Alerter {
  success = jest.fn();
  error = jest.fn();
}
