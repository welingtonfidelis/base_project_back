import { NextFunction, Request, Response, Router } from "express";

import { healthRouter } from "./api/health/route";
import { userRouter } from "./api/users/route";

const router = Router();

router.use(healthRouter);
router.use(userRouter);

// ERROR HANDLER
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
