import { merge } from "lodash";
require("dotenv").config();
import knexconfig from "../../knexfile";

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  port: process.env.PORT || 3000,
  db: {
    path: process.env.DB_FILENAME || "./db/challenge.sqlite3"
  },
  api: {
    baseUri: process.env.API_SUFFIX || "/api/v0",
    messages: {
      limit: process.env.MESSAGES_LIMIT || 100
    }
  },
  secrets: {
    jwt: process.env.JWT_SECRET || "aToken",
    jwtExp: process.env.JWT_EXP || "1d"
  }
};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development").default;
    envConfig.db = merge(envConfig.db, knexconfig.development);
    break;
  case "prod":
  case "production":
    envConfig = require("./production").default;
    envConfig.db = merge(envConfig.db, knexconfig.production);
    break;
  default:
    envConfig = require("./development").default;
    envConfig.db = merge(envConfig.db, knexconfig.development);
}

export default merge(baseConfig, envConfig);
