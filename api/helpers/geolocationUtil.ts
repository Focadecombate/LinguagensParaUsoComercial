import axios, { AxiosInstance } from "axios";
import { helpers } from "../constants";

export class GeolocationUtil {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: helpers.NOMINATIM,
    });
  }

  async getAddress(latitude: string, longitude: string) {
    
    let lat = parseFloat(latitude);
    let lon = parseFloat(longitude);

    const { data } = await this.axiosInstance.get(
      "/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
        },
      }
    );
    
    return data;
  }

  getLocationKmDistance(lat1: any, lon1: any, lat2: any, lon2: any){

    
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;

    return(c * r);
  }
  
}
