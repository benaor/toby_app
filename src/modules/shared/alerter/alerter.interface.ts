export interface Alerter {
  success(message: string): void;
  error(message: string): void;
}
