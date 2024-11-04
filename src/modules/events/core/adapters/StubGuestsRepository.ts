import { Guest } from "../models/Guest.model";
import { GuestsRepository } from "../ports/GuestsRepository";

export class StubGuestsRepository implements GuestsRepository {
  constructor(private guests: Guest[] = []) {}

  async searchMany(_: string) {
    return Promise.resolve(this.guests);
  }
}
