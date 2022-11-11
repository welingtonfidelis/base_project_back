import { NextFunction, Request, Response, Router } from "express";

import { healthRouter } from "./api/health/route";
import { userNoAuthRouter, userAuthRouter } from "./api/users/route";

const router = Router();

// NO AUTHENTICATED ROUTES
router.use(healthRouter);
router.use(userNoAuthRouter);

// AUTHENTICATED ROUTES
router.use(userAuthRouter);

// ERROR HANDLER
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
