import express from "express";
import { ErrorHandler } from "./error.handler";
import { UserRouter } from "./v0/routers/user.router";
import { authMiddleware } from "./v0/auth";
import config from "../config";
import { HealthRouter } from "./v0/routers/health.router";
import { LoginRouter } from "./v0/routers/login.router";

export const router = express.Router();

router.use("/check", HealthRouter);
router.use("/login", LoginRouter);
router.use("/users", UserRouter);
router.use(authMiddleware(config));
router.use(ErrorHandler);
//TODO: in case of not found it's returning a 400 (bad request)
