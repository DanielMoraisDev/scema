import { Router } from "express";

const usersRouter = Router();

import usersController from "@/controllers/users";
import globalMiddlewares from "@/middlewares";
import { USER_ROLES_OPTIONS } from "@/types";

usersRouter
  .route("/register")
  .post(globalMiddlewares.verifyBody, usersController.register);

usersRouter.route("/refresh").post(usersController.refreshToken);

usersRouter
  .route("/login")
  .post(globalMiddlewares.verifyBody, usersController.login);

usersRouter
  .route("/common/:userId")
  .put(
    globalMiddlewares.verifyBody,
    globalMiddlewares.authToken([USER_ROLES_OPTIONS[0], USER_ROLES_OPTIONS[1]]),
    usersController.updateCommon,
  );

usersRouter
  .route("/password/:userId")
  .put(
    globalMiddlewares.verifyBody,
    globalMiddlewares.authToken([USER_ROLES_OPTIONS[0], USER_ROLES_OPTIONS[1]]),
    usersController.updatePassword,
  );

export default usersRouter;
