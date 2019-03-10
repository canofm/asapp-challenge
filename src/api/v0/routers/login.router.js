import express from "express";
import LoginAPIFactory from "../factories/login.api.factory";

const loginController = LoginAPIFactory.getController();

export const LoginRouter = express.Router();

LoginRouter.route("/").post((req, res, next) => loginController.login(req, res, next));
