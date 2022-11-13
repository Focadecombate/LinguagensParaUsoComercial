import { Input, Result, SearchProducts } from "../@types/Common";

export class DrogariaSp implements SearchProducts {
  search(input: Input): Promise<Result[]> {
    throw new Error("Method not implemented.");
  }
}

