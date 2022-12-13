import { Response } from "express";
import {
  DetailResponse,
  Result,
  SearchProducts,
  DetailInput
} from "../@types/Common";
import { DrogariaSp, DrogaRaia, Drogasil } from "../farmacias";

export class DetailsController {
  private productSearchers: SearchProducts[] = [];

  constructor() {
    this.productSearchers.push(new DrogariaSp());
    this.productSearchers.push(new DrogaRaia());
    this.productSearchers.push(new Drogasil());
  }

  async search(input: DetailInput, res: Response): Promise<DetailResponse> {
    const resultsSepareted: Result[][] = await Promise.all(
      this.productSearchers.map((productSearch) => {
        return productSearch.search(input);
      })
    );
    const results: Result[] = resultsSepareted
      .flat()
      .filter(({ name }) => name.includes(input.productName));
    results.sort((a, b) => a.price - b.price);

    return {
      results,
    };
  }
}
