import axios, { AxiosInstance } from "axios";
import { Input, Result, SearchProducts } from "../@types/Common";
import { DrogasilAndDrogaRaiaResponse } from "../@types/Drogasil";
import { pharmacyUrls } from "../constants";
import { GeolocationUtil } from "../helpers/geolocationUtil";

export class DrogaRaia implements SearchProducts {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: pharmacyUrls.DROGA_RAIA,
    });
  }

  async search(input: Input): Promise<Result[]> {
    const { data } = await this.axiosInstance.get<DrogasilAndDrogaRaiaResponse>(
      "/search",
      {
        params: {
          term: input.productName,
          limit: 50,
          sort_by: "relevance:desc",
        },
      }
    );

    const products = data.results.products;

    const results: Result[] = products
      .filter(({ name }) => name.includes(input.productName))
      .map((product) => ({
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
