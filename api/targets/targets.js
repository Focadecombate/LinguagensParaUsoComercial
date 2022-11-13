const pharmacies = [
    {
        endpoint: 'https://api.linximpulse.com/engage/search/v3/search?apiKey=drogariasaopaulo&productFormat=complete&resultsPerPage=48&page=1&terms=%s'
    },
    {
        endpoint: 'https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGARAIA/channel/SITE/product/search?term=%s&limit=36&sort_by=relevance%3Adesc'
    }
]

exports.pharmacies = pharmacies

