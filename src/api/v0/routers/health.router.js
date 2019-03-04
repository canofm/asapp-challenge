import express from "express";
import HealthAPIFactory from "../factories/health.api.factory";

const healthController = HealthAPIFactory.getController();

export const HealthRouter = express.Router();

HealthRouter.route("/").post((req, res, next) => healthController.check(req, res, next));
