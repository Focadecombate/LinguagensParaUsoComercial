import { Input, Result, SearchProducts } from "../@types/Common";

export class Drogasil implements SearchProducts {
  async search(input: Input): Promise<Result[]> {
    return [];
  }
}
