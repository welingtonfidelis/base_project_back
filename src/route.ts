import { Router } from "express";
import { healthRouter } from "./api/health/route";

const router = Router();

router.use(healthRouter);

export { router };