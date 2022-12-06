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
    const store_locations = await this.getStoreLocation(input.latitude, input.longitude);
    const results: Result[] = products.map((product) => ({
      name: product.name,
      price: product.valueTo,
      linkToProduct: product.urlKey,
      store: "DROGA_RAIA",
      image: product.image,
      discountedPrice: product.valueFrom,
      store_locations
    }));

    

    return results;
  }

  async getStoreLocation(lat: string, lon: string) {
    let geo = new GeolocationUtil();
    const data = await geo.getAddress(lat, lon);
    
    const stores = await axios.post("https://bff.drogaraia.com.br/graphql", {
      
        operationName: "getStores",
        variables: {
            stores: data?.address?.suburb,
            regionName: "",
            cityName: data?.address?.city,
            neighborhood: "",
            fullTime: "",
            parking: "",
            pharmacyPopular: "",
            psychotropic: "",
            itensPerPage: 24,
            activePage: 1
        },
        query: "query getStores($stores: String!, $regionName: String!, $cityName: String!, $neighborhood: String!, $fullTime: String!, $parking: String!, $pharmacyPopular: String!, $psychotropic: String!, $itensPerPage: Int!, $activePage: Int!) {\n  stores(\n    input: {searchText: {match: $stores}, regionName: {match: $regionName}, cityName: {match: $cityName}, neighborhood: {match: $neighborhood}, fullTime24h: {eq: $fullTime}, parking: {eq: $parking}, pharmacyPopular: {eq: $pharmacyPopular}, psychotropic: {eq: $psychotropic}, sort: {id: ASC}, pageSize: $itensPerPage, currentPage: $activePage}\n  ) {\n    page_info {\n      current_page\n      page_size\n      total_pages\n      total_count\n      __typename\n    }\n    items {\n      fantasyName\n      telephone\n      telephoneAreaCode\n      pharmacyPopular\n      psychotropic\n      parking\n      fullTime24h\n      address {\n        regionName\n        regionId\n        cityId\n        cityName\n        neighborhood\n        street\n        number\n        postcode\n        __typename\n      }\n      labelAttendance\n      __typename\n    }\n    filters {\n      regionName\n      cityName\n      neighborhood\n      pharmacyPopular\n      parking\n      fullTime24h\n      psychotropic\n      __typename\n    }\n    __typename\n  }\n}\n"
      
    });

    return stores.data?.data?.stores?.items;
    
  }
}
