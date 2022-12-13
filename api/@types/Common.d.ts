export type Store = "DROGASIL" | "DROGA_RAIA" | "DROGARIA_SAO_PAULO";

export interface Result {
  name: string;
  price: number;
  discountedPrice?: number;
  linkToProduct: string;
  store: Store;
  image?: string;
}

export interface SearchResponse {
  stores_locations: any;
  results: Result[];
}

export interface Input {
  productName: string;
  longitude: string;
  latitude: string;
}

export interface DetailInput {
  productName: string;
}

export interface DetailResponse {
  results: Result[];
}

export interface SearchProducts {
  search(input: DetailInput): Promise<Result[]>;
}
