import sqlite3 from "sqlite3";
import config from "./config";

const dbPath = config.db.path;

export const connect = () => new sqlite3.verbose().Database(dbPath);
