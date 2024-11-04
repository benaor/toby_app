import { Guest } from "../models/Guest.model";

export interface GuestsRepository {
  searchMany: (field: string) => Promise<Guest[]>;
}
