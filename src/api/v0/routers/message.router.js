import express from "express";
import MessageAPIFactory from "../factories/message.api.factory";

const messageController = MessageAPIFactory.getController();

export const MessageRouter = express.Router();

MessageRouter.route("/")
  .post((req, res, next) => messageController.create(req, res, next))
  .get((req, res, next) => messageController.fetchAllWithin(req, res, next));
