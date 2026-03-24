import { Router } from "express";

const checkHealthRouter = Router();

import healthController from "@/controllers/health";

checkHealthRouter.route("/").get((req, res) => {
  return healthController.system(req, res);
});

export default checkHealthRouter;
