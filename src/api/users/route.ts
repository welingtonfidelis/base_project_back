import { Router } from "express";

import { userController } from "./controller";
import { authValidate } from "../../shared/middleware/authValidate";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import { loginSchema } from "./midleware/requestPayloadValidateSchema/login";

const userNoAuthRouter = Router();
const userAuthRouter = Router();
const { login, profile } = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/users/login", payloadValidate(loginSchema), login);

// AUTHENTICATED ROUTES
userAuthRouter.use(authValidate);
userAuthRouter.get("/users/profile", profile);

export { userNoAuthRouter, userAuthRouter };
