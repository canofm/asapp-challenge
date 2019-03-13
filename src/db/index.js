import knex from "knex";
import config from "../config";
import { merge } from "lodash";

let connection;

export const connect = (configDb = config.db) => {
  if (connection) {
    return connection;
  }

  connection = createNewConnection(configDb);
  return connection;
};

export const createNewConnection = configDb => {
  const constraints = {
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) // active constraint!
    }
  };
  const configuration = merge(configDb, constraints);
  return knex(configuration);
};
