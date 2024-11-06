import { Guest } from "../models/Guest.model";
import { GuestsRepository } from "../ports/GuestsRepository";

export class FailedGuestsRepository implements GuestsRepository {
  constructor(private guests: Guest[] = []) {}

  searchMany = async (_: string) => {
    throw new Error("Failed to fetch guests");
  };
}
