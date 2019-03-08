import knex from "knex";
import config from "../config";

export const connect = (filename = config.db.path) =>
  knex({
    client: "sqlite3",
    connection: { filename },
    useNullAsDefault: true
  });
