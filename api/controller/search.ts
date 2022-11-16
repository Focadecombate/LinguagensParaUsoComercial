import { Request, Response } from "express";
import { Input, Result, SearchProducts } from "../@types/Common";
import { DrogariaSp, DrogaRaia, Drogasil } from "../farmacias";

export class SearchController {
  private productSearchers: SearchProducts[] = [];

  constructor() {
    this.productSearchers.push(new DrogariaSp());
    this.productSearchers.push(new DrogaRaia());
    this.productSearchers.push(new Drogasil());
  }

  async search(input: Input, res: Response): Promise<Result[]> {
    const results: Result[] = [];
    for (const productSearch of this.productSearchers) {
      let result = await productSearch.search(input);
      results.push(...result);
    }

    return results;
  }
}
