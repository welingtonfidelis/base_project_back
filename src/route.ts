import { NextFunction, Request, Response, Router } from "express";


import { authValidate } from "./shared/middleware/authValidate";
import { healthRouter } from "./api/routes/health";
import { userNoAuthRouter, userRouter } from "./api/routes/users";
import { permissionRouter } from "./api/routes/permissions";
import { httpMessageRouter } from "./api/routes/httpMessages";

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
  console.log('error: ', error);
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
