interface Images {
  "1000x1000": string;
  "200x200": string;
  "400x400": string;
  default: string;
  template: string;
  "template-168848": string;
  "template-450704": string;
}

interface Instalment {
  count: number;
  price: number;
}

interface Seller {
  sellerId: number;
  sellerName: string;
  sellerDefault: true;
}

interface Details {
  sellers: Seller[];
}

interface Sku {
  sku: string;
  properties: {
    details: Details;
    eanCode: string;
    images: Images;
    installment: Instalment;
    name: string;
    oldPrice: number;
    price: number;
    status: string;
    stock: number;
    url: string;
  };
}

interface DrogariaSpProduct {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  url: string;
  images: Images;
  installment: Instalment;
  status: string;
  clickUrl: string;
  created: string;
  cId: string;
  iId: number;
  skus: Sku[];
}

export interface DrogariaSpResult {
  products: DrogariaSpProduct[];
}
