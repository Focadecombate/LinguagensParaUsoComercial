import { Router } from "express";
import { SearchController } from "../controller/search";

export const addRoutes = (router: Router) => {
  const searchController = new SearchController();

  // Rota inicial para apresentação da API
  router.get("/", (req, res) => {
    res.send("API Home");
  });

  // Rota para buscar produtos
  router.get("/search", async (req, res) => {
    await searchController.search(req, res);
  });
};
