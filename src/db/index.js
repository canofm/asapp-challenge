import knex from "knex";
import config from "../config";

let connection;

export const connect = (filename = config.db.path) => {
  if (connection) {
    return connection;
  }

  connection = createNewConnection(filename);
  return connection;
};

export const createNewConnection = filename =>
  knex({
    client: "sqlite3",
    connection: { filename },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) // active foreign keys constraint!
    }
  });
