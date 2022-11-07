import { Router } from "express";
import { healthController } from "./controller";

const healthRouter = Router();

healthRouter.get('/health', healthController.test);

export { healthRouter };