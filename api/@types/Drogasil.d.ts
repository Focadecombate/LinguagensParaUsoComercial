interface DrogasilAndDrogaRaiaMetadata {
  limit: number;
  offset: number;
  totalCount: number;
  pages: number;
  links: {
    self: string;
    first: string;
    previous: string | null;
    next: string;
    last: string;
  };
}

interface DrogasilAndDrogaRaiaProduct {
  sku: string;
  name: string;
  image: string;
  thumbnail: string;
  ean: string;
  dosage: string;
  qty: string;
  urlKey: string;
  clickUrl: string;
  isInStock: number;
  qtyInStock: number;
  valueFrom: number;
  valueTo: number;
}

interface DrogasilAndDrogaRaiaResult {
  products: DrogasilAndDrogaRaiaProduct[];
}

export interface DrogasilAndDrogaRaiaResponse {
  metadata: DrogasilAndDrogaRaiaMetadata;
  results: DrogasilAndDrogaRaiaResult;
}
