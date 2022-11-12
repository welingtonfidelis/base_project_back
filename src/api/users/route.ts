import { Router } from "express";

import { userController } from "./controller";
import { authValidate } from "../../shared/middleware/authValidate";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import {
  loginSchema,
  resetPasswordSchema,
  updateProfilePasswordSchema,
  updateProfileSchema,
} from "./midleware/requestPayloadValidateSchema";

const userNoAuthRouter = Router();
const userAuthRouter = Router();
const {
  login,
  getProfile,
  updateProfile,
  updateProfilePassword,
  resetProfilePassword,
} = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/users/login", payloadValidate(loginSchema), login);
userNoAuthRouter.post(
  "/users/reset-password",
  payloadValidate(resetPasswordSchema),
  resetProfilePassword
);

// AUTHENTICATED ROUTES
userAuthRouter.use(authValidate);
userAuthRouter.get("/users/profile", getProfile);
userAuthRouter.patch(
  "/users/profile",
  payloadValidate(updateProfileSchema),
  updateProfile
);
userAuthRouter.patch(
  "/users/profile/password",
  payloadValidate(updateProfilePasswordSchema),
  updateProfilePassword
);

export { userNoAuthRouter, userAuthRouter };
