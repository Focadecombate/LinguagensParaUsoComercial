import axios, { AxiosInstance } from "axios";
import { Input, Result, SearchProducts } from "../@types/Common";
import { DrogasilAndDrogaRaiaResult } from "../@types/Drogasil";
import { pharmacyUrls } from "../constants";

export class DrogaRaia implements SearchProducts {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: pharmacyUrls.DROGA_RAIA,
    });
  }

  async search(input: Input): Promise<Result[]> {
    const { data } = await this.axiosInstance.get<DrogasilAndDrogaRaiaResult>(
      "/search",
      {
        params: {
          term: input.productName,
          limit: 50,
          sort_by: "relevance:desc",
        },
      }
    );

    const { products } = data;

    const results: Result[] = products.map((product) => ({
      name: product.name,
      price: product.valueTo,
      linkToProduct: product.urlKey,
      store: "DROGA_RAIA",
      image: product.image,
      discountedPrice: product.valueFrom,
    }));

    return results;
  }
}
