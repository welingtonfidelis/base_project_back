import { Router } from "express";
import { healthController } from "../../controllers/health";

const healthRouter = Router();
const { healthCheck } = healthController;

healthRouter.get('/health', healthCheck);

export { healthRouter };