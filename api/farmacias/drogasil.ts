import { Input, Result, SearchProducts } from "../@types/Common";

export class Drogasil implements SearchProducts {
  search(input: Input): Promise<Result[]> {
    throw new Error("Method not implemented.");
  }
}

