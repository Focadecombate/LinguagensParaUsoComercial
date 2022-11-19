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
    const resultsSepareted: Result[][] = await Promise.all(
      this.productSearchers.map((productSearch) => {
        return productSearch.search(input);
      })
    );
    const results: Result[] = resultsSepareted.flat();
    results.sort((a, b) => a.price - b.price);
    return results;
  }
}
