import { Router } from "express";
import { healthController } from "../../controllers/health";

const healthRouter = Router();
const { healthCheck } = healthController;

healthRouter.get('/', healthCheck);

export { healthRouter };