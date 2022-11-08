import { Response, Router } from "express";
import { healthRouter } from "./api/health/route";

const router = Router();

router.use(healthRouter);

// ERROR HANDLER
router.use((error, req, res: Response, next) => {
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
