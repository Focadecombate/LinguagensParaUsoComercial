import axios from "axios";
import { Request, Response } from "express";
import { Input, Result, SearchProducts, SearchResponse } from "../@types/Common";
import { DrogariaSp, DrogaRaia, Drogasil } from "../farmacias";
import { GeolocationUtil } from "../helpers/geolocationUtil";

export class SearchController {
  private productSearchers: SearchProducts[] = [];

  constructor() {
    this.productSearchers.push(new DrogariaSp());
    this.productSearchers.push(new DrogaRaia());
    this.productSearchers.push(new Drogasil());
  }

  async search(input: Input, res: Response): Promise<SearchResponse> {
    const resultsSepareted: Result[][] = await Promise.all(
      this.productSearchers.map((productSearch) => {
        return productSearch.search(input);
      })
    );
    const results: Result[] = resultsSepareted.flat();
    results.sort((a, b) => a.price - b.price);

    const stores_locations = await this.getStoresLocations(input.latitude, input.longitude);
    
    const result: SearchResponse = {
      stores_locations,
      results
    };
    return result;
  }

  async getStoresLocations(lat: string, lon: string) {
    let geo = new GeolocationUtil();
    const data = await geo.getAddress(lat, lon);
    
    const locationParam = {
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
    }

    let drogasil = [];
    let drogaraia = [];
    let drogariaSp: any = [];
    let error_message = null;
    
    try {
      const drogasilDto = await axios.post("https://site-bff-prod.drogasil.com.br/graphql", locationParam);
      const drogaraiaDto = await axios.post("https://bff.drogaraia.com.br/graphql", locationParam);
      drogasil = drogasilDto.data?.data?.stores?.items,
      drogaraia = drogaraiaDto.data?.data?.stores?.items
    } catch (error) {
      error_message = error;
    }
    

    return {
      error_message,
      locations: {
        drogasil,
        drogaraia,
        drogariaSp
      }
    };
    
  }
}
