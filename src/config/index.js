import { merge } from "lodash";
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  port: process.env.PORT || 3002,
  db: {
    path: process.env.DB_PATH || "/db/challenge.db"
  },
  api: {
    baseUri: process.env.API_SUFFIX || "/api/v0"
  },
  secrets: {
    jwt: process.env.JWT_SECRET || "aToken",
    jwtExp: process.env.JWT_EXP || "100d"
  }
};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./production").config;
    break;
  default:
    envConfig = require("./development").config;
}

export default merge(baseConfig, envConfig);
