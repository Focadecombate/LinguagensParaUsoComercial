import { Request, Response } from "express";
import { Result, SearchProducts } from "../@types/Common";
import { DrogariaSp, DrogaRaia, Drogasil } from "../farmacias";

export class SearchController {
  private productSearchers: SearchProducts[] = [];

  constructor() {
    this.productSearchers.push(new DrogariaSp());
    this.productSearchers.push(new DrogaRaia());
    this.productSearchers.push(new Drogasil());
  }

  async search({ query }: Request, res: Response): Promise<void> {
    const results: Result[] = [];
  }
}
