import express from "express";
const { Router } = express;
export const router = Router();

import usersRouter from "./users";
router.use("/users", usersRouter);
