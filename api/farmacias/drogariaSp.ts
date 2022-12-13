import { Input, Result, SearchProducts } from "../@types/Common";
import axios, { AxiosInstance } from "axios";
import { DrogariaSpResult } from "../@types/DrograriaSp";
import { pharmacyUrls } from "../constants";

export class DrogariaSp implements SearchProducts {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: pharmacyUrls.DROGARIA_SAO_PAULO,
    });
  }

  async search(input: Input): Promise<Result[]> {
    const { data } = await this.axiosInstance.get<DrogariaSpResult>("/search", {
      params: {
        terms: input.productName,
        resultsPerPage: 50,
        productFormat: "complete",
        apiKey: "drogariasaopaulo",
      },
      headers: {
        origin: "https://www.drogariasaopaulo.com.br/",
      },
    });

    const products = data.products;
    const results: Result[] = products
      .filter(({ name }) => name.includes(input.productName))
      .map((product) => ({
        name: product.name,
        price: product.price,
        linkToProduct: product.url,
        store: "DROGARIA_SAO_PAULO",
        image: product.images.default,
        discountedPrice: product.oldPrice,
      }));

    return results;
  }
}
