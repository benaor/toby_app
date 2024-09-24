import { Alerter } from "./alerter.interface";

export class AlertAlerter implements Alerter {
  success(message: string) {
    console.info(message);
  }

  error(message: string) {
    console.error(message);
  }
}
