import { Input, Result, SearchProducts } from "../@types/Common";

export class DrogariaSp implements SearchProducts {
  async search(input: Input): Promise<Result[]> {
    return [];
  }
}
