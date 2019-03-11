import express from "express";
// import config from "../config";
// import { authMiddleware } from "./v0/auth";
import { ErrorHandler } from "./error.handler";
import { UserRouter } from "./v0/routers/user.router";
import { HealthRouter } from "./v0/routers/health.router";
import { LoginRouter } from "./v0/routers/login.router";
import { MessageRouter } from "./v0/routers/message.router";

export const router = express.Router();

router.use("/check", HealthRouter);
router.use("/login", LoginRouter);
router.use("/users", UserRouter);
// router.use(authMiddleware(config));
router.use("/messages", MessageRouter);
router.use(ErrorHandler);
//TODO: in case of not found it's returning a 400 (bad request)
