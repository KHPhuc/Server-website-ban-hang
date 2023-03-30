import { Router } from "express";
import {
  getCard,
  getLine,
  getPie,
  getTree
} from "../../controller/statistic.controller";

const statisticRouter = Router();

statisticRouter.get("", getCard);
statisticRouter.get("/line", getLine);
statisticRouter.get("/pie", getPie);
statisticRouter.get("/tree", getTree);

export default statisticRouter;
