import { Router } from "express";

import { userController } from "./controller";
import { authValidate } from "../../shared/middleware/authValidate";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import { loginSchema } from "./midleware/requestPayloadValidateSchema/login";
import { updateProfileSchema } from "./midleware/requestPayloadValidateSchema/updateProfile";

const userNoAuthRouter = Router();
const userAuthRouter = Router();
const { login, getProfile, updateProfile } = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/users/login", payloadValidate(loginSchema), login);

// AUTHENTICATED ROUTES
userAuthRouter.use(authValidate);
userAuthRouter.get("/users/profile", getProfile);
userAuthRouter.patch(
  "/users/profile",
  payloadValidate(updateProfileSchema),
  updateProfile
);

export { userNoAuthRouter, userAuthRouter };
