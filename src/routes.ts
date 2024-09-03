import { Router } from "express";
import FilmeController from "./filmeController";
import FilmeRepositorio from "./infra/filmeRepositorio";

const routes = Router();

const filmeRepositorio = new FilmeRepositorio();
const filmeController = new FilmeController(filmeRepositorio);

routes.use('/filmes', filmeController.router);

export default routes;