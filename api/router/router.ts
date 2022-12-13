import { Router } from "express";
import { SearchController } from "../controller/search";
import { DetailsController } from "../controller/details";

export const addRoutes = (router: Router) => {
  const searchController = new SearchController();
  const detailsController = new DetailsController();

  // Rota inicial para apresentação da API
  router.get("/", (req, res) => {
    res.send("API Home");
  });

  // Rota para buscar produtos
  router.get("/search/:productName/:latitude/:longitude", async (req, res) => {
    const response = await searchController.search(req.params, res);
    res.send(response);
  });
  router.get("/search/details/:productName", async (req, res) => {
    const response = await detailsController.search(req.params, res);
    res.send(response);
  });
};
