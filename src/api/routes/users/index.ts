import { Router } from "express";
import multer from "multer";

import { userController } from "../../controllers/users";
import {
  deleteSchema,
  getByIdSchema,
  listSchema,
  loginSchema,
  resetPasswordSchema,
  updateSchema,
  createSchema,
  updatedResetedPasswordSchema,
  updateProfilePasswordSchema,
  updateProfileSchema,
} from "./midleware/requestPayloadValidateSchema";
import { Role } from "@prisma/client";
import { payloadValidate } from "../../../shared/middleware/payloadValidate";
import { permissionValidate } from "../../../shared/middleware/permissionValidate";

const { ADMIN, MANAGER } = Role;

const userNoAuthRouter = Router();
const userRouter = Router();
const {
  login,
  logout,
  getProfile,
  updateProfile,
  updateProfilePassword,
  resetPassword,
  updateResetedPassword,
  list,
  getById,
  update,
  delete: deleteById,
  create,
} = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/login", payloadValidate(loginSchema), login);
userNoAuthRouter.post("/logout", logout);
userNoAuthRouter.post(
  "/reset-password",
  payloadValidate(resetPasswordSchema),
  resetPassword
);
userNoAuthRouter.post(
  "/update-reseted-password",
  payloadValidate(updatedResetedPasswordSchema),
  updateResetedPassword
);

// AUTHENTICATED ROUTES
userRouter.get("/profile", getProfile);
userRouter.patch(
  "/profile",
  [multer().single("file"), payloadValidate(updateProfileSchema)],
  updateProfile
);
userRouter.patch(
  "/profile/password",
  payloadValidate(updateProfilePasswordSchema),
  updateProfilePassword
);

// ROUTES WITH PERMISSION VALIDATE
userRouter.use(permissionValidate([ADMIN, MANAGER]));
userRouter.get("/", payloadValidate(listSchema), list);
userRouter.get("/:id", payloadValidate(getByIdSchema), getById);
userRouter.patch("/:id", payloadValidate(updateSchema), update);
userRouter.post("", payloadValidate(createSchema), create);
userRouter.delete("/:id", payloadValidate(deleteSchema), deleteById);

export { userNoAuthRouter, userRouter };
