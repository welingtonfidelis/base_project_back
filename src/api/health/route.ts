import { Router } from "express";
import { healthController } from "./controller";

const healthRouter = Router();
const { healthCheck } = healthController;

healthRouter.get('/health', healthCheck);

export { healthRouter };