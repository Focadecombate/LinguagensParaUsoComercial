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
  
}
