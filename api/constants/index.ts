import { Store } from "../@types/Common";

export const pharmacyUrls: Record<Store, string> = {
    DROGA_RAIA: "https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGARAIA/channel/SITE/product",
    DROGASIL: "https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGASIL/channel/SITE/product",
    DROGARIA_SAO_PAULO: "https://api.linximpulse.com/engage/search/v3",
};

export const pharmacyLocationUrls = {
  DROGA_RAIA: "https://bff.drogaraia.com.br/graphql",
  DROGASIL: "https://site-bff-prod.drogasil.com.br/graphql",
  DROGARIA_SAO_PAULO: "https://www.drogariasaopaulo.com.br/api/dataentities/PR/documents/f52e9e7f-a02c-11ea-8337-0a8ac637298d/arquivo/attachments/nossas-lojas.js",
}

export const helpers = {
  NOMINATIM: "https://nominatim.openstreetmap.org"
}
