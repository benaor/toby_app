import { Alerter } from "./alerter.interface";

export class AlertAlerter implements Alerter {
  success(message: string) {
    alert(message);
  }

  error(message: string) {
    alert(message);
  }
}
