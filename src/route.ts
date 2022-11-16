import { NextFunction, Request, Response, Router } from "express";

import { healthRouter } from "./api/health/route";
import { httpMessageRouter } from "./api/httpMessages/route";
import { permissionRouter } from "./api/permissions/route";
import { userNoAuthRouter, userRouter } from "./api/users/route";
import { authValidate } from "./shared/middleware/authValidate";

const router = Router();

// NO AUTHENTICATED ROUTES
router.use(healthRouter);
router.use(userNoAuthRouter);

// AUTHENTICATED ROUTES
router.use(authValidate);
router.use(userRouter);
router.use(permissionRouter);
router.use(httpMessageRouter);

// ERROR HANDLER
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
