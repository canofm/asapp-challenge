import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "./db";
import { router } from "./api";
import config from "./config";
import logger from "./logger";
import { merge } from "lodash";

export default (appConfig = {}) => {
  const configuration = merge({}, config, appConfig);

  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // connecting to db
  connect(configuration.db.path);

  app.use(configuration.api.baseUri, router);

  return app;
};

// last chance to log
process.on("uncaughtException", err => {
  logger.error(err.stack);
});
