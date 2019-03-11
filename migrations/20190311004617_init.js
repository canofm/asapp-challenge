"use strict";

const bluebird = require("bluebird");

exports.up = function(knex, Promise) {
  return Promise.resolve()
    .then(() => createUsersTable(knex))
    .then(() => createMessagesTable(knex));
};

function createUsersTable(knex) {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .primary()
      .unsigned();
    table.string("username").unique();
    table.string("password");
    table.timestamps();
  });
}

function createMessagesTable(knex) {
  return knex.schema.createTable("messages", table => {
    table
      .increments("id")
      .primary()
      .unsigned();
    table
      .integer("sender")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table
      .integer("recipient")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("text");
    table.string("url");
    table.integer("height").unsigned();
    table.integer("width").unsigned();
    table.enu("source", ["youtube", "vimeo"]);
    table.enu("type", ["text", "image", "video"]);
    table.timestamps();
  });
}

//eslint-disable-next-line
exports.down = function(knex, Promise) {
  const tables = ["users", "messages"];

  return bluebird.map(tables, table => knex.schema.dropTable(table));
};
