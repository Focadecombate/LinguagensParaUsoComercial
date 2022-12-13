---
date created: Thursday, November 3rd 2022, 11:01:28 am
date modified: Thursday, November 3rd 2022, 6:10:28 pm
---

# API Node

## Arquitetura

### Servidor

![[Arquitetura.png]]

Um servidor simples, utilizando o express para disponibilizar uma rota /search que utiliza queryparams para chamar a função de procura de ofertas.

### Requisições

Requisição exemplo para teste: http://localhost:3000/v1/search/bupropiona/-12.952709/-38.460768

Utilizar o axios para fazer requisições para as rotas expostas, assim buscando os dados das farmácias.

### Objeto a Ser Retornado

```ts
type Store = "DROGASIL" | "DROGA_RAIA" | "DROGARIA_SAO_PAULO";

interface Result {
  name: string;
  price: number;
  discountedPrice?: number;
  linkToProduct: string;
  store: Store;
  image?: string;
}

interface Input {
  productName: string;
  latitude: string;
  longitude: string;
}

interface SearchProducts {
  search(input: Input): Promise<Result[]>;
}
```

## Rotas Para Pegar Os Dados

### Drogaria SP

Rota

Só mudar o terms

```sh
curl --request GET \
  --url 'https://api.linximpulse.com/engage/search/v3/search?apiKey=drogariasaopaulo&productFormat=complete&resultsPerPage=48&page=1&terms=paracetamol' \
  --header 'accept: application/json, text/javascript, */*; q=0.01' \
  --header 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  --header 'authority: api.linximpulse.com' \
  --header 'origin: https://www.drogariasaopaulo.com.br'
```

### Droga Raia

Rota

Só mudar o term

```sh
curl --request GET \
  --url 'https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGARAIA/channel/SITE/product/search?term=dipirona&limit=36&sort_by=relevance%3Adesc' \
  --header 'accept: */*' \
  --header 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  --header 'authority: api-gateway-prod.drogasil.com.br' \
  --header 'origin: https://www.drogaraia.com.br'
```

### Drogasil

Rota

só mudar o term

```sh
curl --request GET \
  --url 'https://api-gateway-prod.drogasil.com.br/search/v2/store/DROGASIL/channel/SITE/product/search?term=paracetamol&ranking=1&limit=24&sort_by=relevance%3Adesc' \
  --header 'accept: */*' \
  --header 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  --header 'authority: api-gateway-prod.drogasil.com.br' \
  --header 'origin: https://www.drogasil.com.br'
```
