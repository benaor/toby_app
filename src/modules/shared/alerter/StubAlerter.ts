import { Alerter } from "./Alerter.port";

export class StubAlerter implements Alerter {
  public errorFn = jest.fn();
  public successFn = jest.fn();

  success(message: string) {
    this.successFn(message);
  }
  error(message: string) {
    this.errorFn(message);
  }
}
