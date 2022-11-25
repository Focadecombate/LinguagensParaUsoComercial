import { Store } from "../@types/Common";

export const pharmacyUrls: Record<Store, string> = {
    DROGA_RAIA: "https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGARAIA/channel/SITE/product",
    DROGASIL: "https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGASIL/channel/SITE/product",
    DROGARIA_SAO_PAULO: "https://api.linximpulse.com/engage/search/v3",
};
