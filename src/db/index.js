import knex from "knex";
import config from "../config";

let connection;

export const connect = (filename = config.db.path) => {
  if (connection) {
    return connection;
  }

  connection = knex({
    client: "sqlite3",
    connection: { filename },
    useNullAsDefault: true
  });

  return connection;
};
