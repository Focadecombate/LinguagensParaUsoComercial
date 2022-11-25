
# NodeJS API

## Para inciar a aplicação

```sh
yarn
```

```sh
yarn start
```

## Para inciar a aplicação utilizando Docker

```sh
docker image build -t nodejs-api .
```

```sh
docker container run -p 3000:3000 nodejs-api
```

## Considerações

- As variáveis de ambiente devem ser informadas em um arquivo ```.env``` na raiz do projeto
